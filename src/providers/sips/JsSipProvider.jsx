import * as JsSIP from "jssip";
import { createContext, useEffect, useState } from "react";
import {
    CALL_DIRECTION_OUTGOING,
    CALL_STATUS_CONFIRMED,
    CALL_STATUS_ENDED,
    CALL_STATUS_FAILED,
    CALL_STATUS_IDLE,
    CALL_STATUS_PROGRESS,
    CALL_STATUS_STARTING,
    SIP_ERROR_TYPE_CONFIGURATION,
    SIP_ERROR_TYPE_CONNECTION,
    SIP_ERROR_TYPE_REGISTRATION,
    SIP_STATUS_CONNECTED,
    SIP_STATUS_CONNECTING,
    SIP_STATUS_DISCONNECTED,
    SIP_STATUS_ERROR,
    SIP_STATUS_REGISTERED,
    WS_STATUS_CONNECTED,
    WS_STATUS_CONNECTING,
    WS_STATUS_DISCONNECTED
} from "./libs/enums";
import { useDispatch, useSelector } from "react-redux";
import {
    handleSetCallDirection,
    handleSetCallStatus,
    handleSetSipStatus,
    handleSetWsStatus
} from "../../redux/slices/jsSipSlice";
import { toast } from "react-toastify";
import ringBackAudioCall from "../../assets/audio/ringbacktone.mp3";
import callHistoryApis from "../../lib/api/callHistoryApis";
import cdrApis from "../../lib/api/cdrApis";

const JsSipContext = createContext();

export const JsSipProvider = ({ children }) => {
    const [callCounterpart, setCallCounterpart] = useState(null);
    const [rtcSession, setRtcSession] = useState(null);
    const [rtcRequest, setRtcRequest] = useState(null);
    const [originator, setOriginator] = useState(null);
    const [UA, setUA] = useState(null);
    const dispatch = useDispatch();
    const { user: userData } = useSelector((state) => state.auth);

    const ringBackAudio = new Audio(ringBackAudioCall);

    let ua;
    let remoteAudio;

    JsSIP.debug.disable("JsSIP:*");

    const reinitializeJsSIP = async (userData) => {
        if (ua) {
            ua.stop();
            ua = null;
        }

        const user = userData?.user?.sipNumber;
        const password = userData?.user?.sipPassword;

        if (!user || !password) {
            dispatch(handleSetSipStatus(SIP_STATUS_DISCONNECTED));

            return;
        }

        try {
            const socket = new JsSIP.WebSocketInterface(`wss://sip.kynaenglish.vn:8089/ws`);
            ua = new JsSIP.UA({
                uri: `sip:${user}@sip.kynaenglish.vn`,
                password,
                contact_uri: `sip:${user}@sip.kynaenglish.vn`,
                sockets: [socket],
                register: true
            });
            setUA(ua);
        } catch (error) {
            dispatch(handleSetSipStatus(SIP_STATUS_ERROR));

            return;
        }

        ua.on("connecting", () => {
            console.log('UA "connecting" event');
            if (ua !== ua) {
                return;
            }

            dispatch(handleSetWsStatus(WS_STATUS_CONNECTING));
        });

        ua.on("connected", () => {
            console.debug('UA "connected" event');
            if (ua !== ua) {
                return;
            }

            dispatch(handleSetWsStatus(WS_STATUS_CONNECTED));
        });

        ua.on("disconnected", () => {
            console.log('UA "disconnected" event');
            if (ua !== ua) {
                return;
            }

            dispatch(handleSetWsStatus(WS_STATUS_DISCONNECTED));
        });

        ua.on("registered", (data) => {
            console.log('UA "registered" event', data);
            if (ua !== ua) {
                return;
            }

            dispatch(handleSetSipStatus(SIP_STATUS_REGISTERED));
        });

        ua.on("unregistered", () => {
            console.log('UA "unregistered" event');
            if (ua !== ua) {
                return;
            }

            if (ua.isConnected()) {
                dispatch(handleSetSipStatus(SIP_STATUS_CONNECTED));
            } else {
                dispatch(handleSetSipStatus(SIP_STATUS_DISCONNECTED));
            }
        });

        ua.on("registrationFailed", (data) => {
            console.log('UA "registrationFailed" event');
            if (ua !== ua) {
                return;
            }

            console.log("registrationFailed", data);

            dispatch(handleSetSipStatus(SIP_STATUS_ERROR));
        });

        // rtc session
        ua.on("newRTCSession", ({ originator, session: rtcSession, request: rtcRequest }) => {
            if (ua !== ua) {
                return;
            }
            setRtcSession(rtcSession);
            setRtcRequest(rtcRequest);
            setOriginator(originator);

            // identify call direction
            if (originator === "local") {
                const foundUri = rtcRequest.to.toString();
                const delimiterPosition = foundUri.indexOf(";") || null;

                dispatch(handleSetCallDirection("OUTGOING"));
            } else if (originator === "remote") {
                const foundUri = rtcRequest.from.toString();
                const delimiterPosition = foundUri.indexOf(";") || null;

                console.log("INCOMING");

                dispatch(handleSetCallDirection("INCOMING"));

                setCallCounterpart(foundUri.substring(0, delimiterPosition) || foundUri);
            }
        });

        ua.start();
    };

    const eventHandlers = {
        connecting: function (e) {
            console.log("call is in connecting", e);
            dispatch(handleSetCallStatus(CALL_STATUS_STARTING));

            ringBackAudio.loop = true;
            ringBackAudio.play();
        },
        progress: function (e) {
            console.log("call is in progress", e);
            dispatch(handleSetCallStatus(CALL_STATUS_PROGRESS));

            ringBackAudio.loop = false;
            ringBackAudio.pause();
        },
        failed: async function (e) {
            ringBackAudio.loop = false;
            ringBackAudio.pause();
            console.log("call failed with cause: ", e);
            dispatch(handleSetCallStatus(CALL_STATUS_FAILED));
            await cdrApis.updateCdrAfterCall();
        },
        ended: async function (e) {
            console.log("call ended with cause: ", e);
            dispatch(handleSetCallStatus(CALL_STATUS_ENDED));
            toast.info("cuộc goọi đã kết thúc");
            if (e.originator === "remote") {
                await cdrApis.updateCdrAfterCall();
            }
        },
        confirmed: function (e) {
            console.log("call confirmed", e);
            dispatch(handleSetCallStatus(CALL_STATUS_CONFIRMED));
        }
    };

    const options = {
        eventHandlers,
        mediaConstraints: { audio: true, video: false },
        rtcOfferConstraints: { iceRestart: true },
        pcConfig: {
            iceServers: [
                // optional
                // { urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19305"] }
                // { urls: "turn:example.com", username: "foo", credential: "1234" }
            ]
        }
    };

    // start call
    const startCall = (destination) => {
        if (!destination) {
            throw new Error(`Destination must be defined (${destination} given)`);
        }

        UA.call(destination, options);

        dispatch(handleSetCallStatus(CALL_STATUS_STARTING));
    };
    // end call

    // answerCall
    const answerCall = () => {
        rtcSession.answer(options);
    };
    // end answerCall

    // stop call
    const stopCall = async () => {
        UA.terminateSessions();
        dispatch(handleSetCallStatus("stop"));
    };
    // end stop call

    useEffect(() => {
        if (window.document.getElementById("dve-provider-audio")) {
            throw new Error(
                `Creating two SipProviders in one application is forbidden. If that's not the case ` +
                    `then check if you're using "sip-provider-audio" as id attribute for any existing ` +
                    `element`
            );
        }

        remoteAudio = window.document.createElement("audio");
        remoteAudio.id = "dve-provider-audio";
        window.document.body.appendChild(remoteAudio);

        reinitializeJsSIP(userData);
    }, []);

    return (
        <JsSipContext.Provider
            value={{
                UA,
                startCall,
                stopCall,
                answerCall,
                remoteAudio,
                rtcSession,
                rtcRequest,
                originator
            }}
        >
            {children}
        </JsSipContext.Provider>
    );
};

export default JsSipContext;
