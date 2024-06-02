import * as JsSIP from "jssip";
import { createContext, useEffect, useState } from "react";
import {
    CALL_DIRECTION_INCOMING,
    CALL_DIRECTION_OUTGOING,
    CALL_STATUS_ACTIVE,
    CALL_STATUS_IDLE,
    CALL_STATUS_STARTING,
    CALL_STATUS_STOPPING,
    SIP_ERROR_TYPE_CONFIGURATION,
    SIP_ERROR_TYPE_CONNECTION,
    SIP_ERROR_TYPE_REGISTRATION,
    SIP_STATUS_CONNECTED,
    SIP_STATUS_CONNECTING,
    SIP_STATUS_DISCONNECTED,
    SIP_STATUS_ERROR,
    SIP_STATUS_REGISTERED,
    WS_STATUS_CONNECTING
} from "./libs/enums";
import { useDispatch } from "react-redux";
import { handleSetSipStatus, handleSetWsStatus } from "../../redux/slices/jsSipSlice";

const JsSipContext = createContext();

export const JsSipProvider = ({ children }) => {
    const [sipStatus, setSipStatus] = useState(null);
    const [sipErrorType, setSipErrorType] = useState(null);
    const [sipErrorMessage, setSipErrorMessage] = useState(null);
    const [callStatus, setCallStatus] = useState(null);
    const [callDirection, setCallDirection] = useState(null);
    const [callCounterpart, setCallCounterpart] = useState(null);
    const [rtcSession, setRtcSession] = useState(null);
    const [UA, setUA] = useState(null);
    const dispatch = useDispatch();

    let ua;
    let remoteAudio;

    JsSIP.debug.disable("JsSIP:*");

    const reinitializeJsSIP = async () => {
        if (ua) {
            ua.stop();
            ua = null;
        }

        const user = 99999;
        const password = "m3xAks86m7KKJU6AbU5Sk4HZ2aa";

        if (!user) {
            setSipStatus(SIP_STATUS_DISCONNECTED);
            setSipErrorType(null);
            setSipErrorMessage(null);

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
            console.log("Error", error.message, error);

            setSipStatus(SIP_STATUS_ERROR);
            setSipErrorType(SIP_ERROR_TYPE_CONFIGURATION);
            setSipErrorMessage(error.message);

            dispatch(handleSetSipStatus(SIP_STATUS_ERROR));

            return;
        }

        ua.on("connecting", () => {
            console.log('UA "connecting" event');
            if (ua !== ua) {
                return;
            }

            setSipStatus(SIP_STATUS_CONNECTING);
            setSipErrorType(null);
            setSipErrorMessage(null);

            dispatch(handleSetWsStatus("connecting"));
        });

        ua.on("connected", () => {
            console.debug('UA "connected" event');
            if (ua !== ua) {
                return;
            }

            setSipStatus(SIP_STATUS_CONNECTED);
            setSipErrorType(null);
            setSipErrorMessage(null);

            dispatch(handleSetWsStatus("connected"));
        });

        ua.on("disconnected", () => {
            console.log('UA "disconnected" event');
            if (ua !== ua) {
                return;
            }

            setSipStatus(SIP_STATUS_ERROR);
            setSipErrorType(SIP_ERROR_TYPE_CONNECTION);
            setSipErrorMessage("disconnected");

            dispatch(handleSetWsStatus("disconnected"));
        });

        ua.on("registered", (data) => {
            console.log('UA "registered" event', data);
            if (ua !== ua) {
                return;
            }

            setSipStatus(SIP_STATUS_REGISTERED);
            setCallStatus(CALL_STATUS_IDLE);

            dispatch(handleSetSipStatus("registered"));
        });

        ua.on("unregistered", () => {
            console.log('UA "unregistered" event');
            if (ua !== ua) {
                return;
            }

            if (ua.isConnected()) {
                setSipStatus(SIP_STATUS_CONNECTED);
                setCallStatus(CALL_STATUS_IDLE);
                setCallDirection(null);

                dispatch(handleSetSipStatus("SIP_STATUS_CONNECTED"));
            } else {
                setSipStatus(SIP_STATUS_DISCONNECTED);
                setCallStatus(CALL_STATUS_IDLE);
                setCallDirection(null);

                dispatch(handleSetSipStatus("SIP_STATUS_DISCONNECTED"));
            }
        });

        ua.on("registrationFailed", (data) => {
            console.log('UA "registrationFailed" event');
            if (ua !== ua) {
                return;
            }

            setSipStatus(SIP_STATUS_ERROR);
            setSipErrorType(SIP_ERROR_TYPE_REGISTRATION);
            setSipErrorMessage(data);
        });

        // rtc session
        ua.on("newRTCSession", ({ originator, session: rtcSession, request: rtcRequest }) => {
            if (ua !== ua) {
                return;
            }
            setRtcSession(rtcSession);

            console.log("rtcSessionrtcSessionrtcSessionrtcSession", rtcSession);

            // if (rtcSession.direction === "incoming") {
            //     // incoming call here
            //     rtcSession.on("accepted", function () {
            //         // the call has answered
            //     });
            //     rtcSession.on("confirmed", function () {
            //         // this handler will be called for incoming calls too
            //     });
            //     rtcSession.on("ended", function () {
            //         // the call has ended
            //     });
            //     rtcSession.on("failed", function () {
            //         // unable to establish the call
            //     });
            //     rtcSession.on("addstream", function (e) {
            //         // set remote audio stream (to listen to remote audio)
            //         // remoteAudio is <audio> element on page
            //         remoteAudio.src = window.URL.createObjectURL(e.stream);
            //         remoteAudio.play();
            //     });
            //
            //     // Answer call
            //     rtcSession.answer({
            //         mediaConstraints: {
            //             audio: true,
            //             video: false
            //         },
            //         pcConfig: {
            //             iceServers: iceServers
            //         }
            //     });
            //
            //     // Reject call (or hang up it)
            //     rtcSession.terminate();
            // }

            // identify call direction
            if (originator === "local") {
                const foundUri = rtcRequest.to.toString();
                const delimiterPosition = foundUri.indexOf(";") || null;

                setCallDirection(CALL_DIRECTION_OUTGOING);
                setCallStatus(CALL_STATUS_STARTING);
                setCallCounterpart(foundUri.substring(0, delimiterPosition) || foundUri);
            } else if (originator === "remote") {
                const foundUri = rtcRequest.from.toString();
                const delimiterPosition = foundUri.indexOf(";") || null;

                setCallDirection(CALL_DIRECTION_INCOMING);
                setCallStatus(CALL_STATUS_STARTING);
                setCallCounterpart(foundUri.substring(0, delimiterPosition) || foundUri);
            }
            //
            //     const { rtcSession: rtcSessionInState } = this.state;
            //
            //     // Avoid if busy or other incoming
            //     if (rtcSessionInState) {
            //         this.logger.debug('incoming call replied with 486 "Busy Here"');
            //         rtcSession.terminate({
            //             status_code: 486,
            //             reason_phrase: "Busy Here"
            //         });
            //         return;
            //     }
            //
            //     this.setState({ rtcSession });
            // rtcSession.on("failed", () => {
            //     if (ua !== ua) {
            //         return;
            //     }
            //
            //     setRtcSession(null);
            //     setCallStatus(CALL_STATUS_IDLE);
            //     setCallDirection(null);
            //     setCallCounterpart(null);
            // });
            //
            // rtcSession.on("ended", () => {
            //     if (ua !== ua) {
            //         return;
            //     }
            //
            //     setRtcSession(null);
            //     setCallStatus(CALL_STATUS_IDLE);
            //     setCallDirection(null);
            //     setCallCounterpart(null);
            // });
            //
            // rtcSession.on("accepted", () => {
            //     if (ua !== ua) {
            //         return;
            //     }
            //
            //     [remoteAudio.srcObject] = rtcSession.connection.getRemoteStreams();
            //     // const played = this.remoteAudio.play();
            //     const played = remoteAudio.play();
            //
            //     if (typeof played !== "undefined") {
            //         played
            //             .catch(() => {
            //                 /**/
            //             })
            //             .then(() => {
            //                 setTimeout(() => {
            //                     remoteAudio.play();
            //                 }, 2000);
            //             });
            //         setCallStatus(CALL_STATUS_ACTIVE);
            //         return;
            //     }
            //
            //     setTimeout(() => {
            //         remoteAudio.play();
            //     }, 2000);
            //
            //     setCallStatus(CALL_STATUS_ACTIVE);
            // });

            // if (callDirection === CALL_DIRECTION_INCOMING && autoAnswer) {
            //     logger.log("Answer auto ON");
            //     answerCall();
            // } else if (callDirection === CALL_DIRECTION_INCOMING && !autoAnswer) {
            //     logger.log("Answer auto OFF");
            // } else if (callDirection === CALL_DIRECTION_OUTGOING) {
            //     logger.log("OUTGOING call");
            // }
        });

        // end rtc session

        // const extraHeadersRegister = extraHeaders.register || [];
        // if (extraHeadersRegister.length) {
        //     ua.registrator().setExtraHeaders(extraHeadersRegister);
        // }

        ua.start();
    };

    const options = {
        // extraHeaders,
        mediaConstraints: { audio: true, video: false },
        rtcOfferConstraints: { iceRestart: true },
        pcConfig: {
            iceServers: [
                // optional
                // { urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19305"] }
                // { urls: "turn:example.com", username: "foo", credential: "1234" }
            ]
        }
        // sessionTimersExpires
    };

    // start call
    const startCall = (destination) => {
        if (!destination) {
            throw new Error(`Destination must be defined (${destination} given)`);
        }
        if (sipStatus !== SIP_STATUS_CONNECTED && sipStatus !== SIP_STATUS_REGISTERED) {
            throw new Error(
                `Calling startCall() is not allowed when sip status is ${this.state.sipStatus} (expected ${SIP_STATUS_CONNECTED} or ${SIP_STATUS_REGISTERED})`
            );
        }

        if (callStatus !== CALL_STATUS_IDLE) {
            throw new Error(
                `Calling startCall() is not allowed when call status is ${callStatus} (expected ${CALL_STATUS_IDLE})`
            );
        }

        // const { iceServers, sessionTimersExpires } = this.props;
        // const extraHeaders = extraHeaders.invite;

        UA.call(destination, options);

        setCallStatus(CALL_STATUS_STARTING);
    };
    // end call

    // answerCall
    const answerCall = () => {
        if (callStatus !== CALL_STATUS_STARTING || callDirection !== CALL_DIRECTION_INCOMING) {
            throw new Error(
                `Calling answerCall() is not allowed when call status is ${callStatus} and call direction is ${callDirection}  (expected ${CALL_STATUS_STARTING} and ${CALL_DIRECTION_INCOMING})`
            );
        }

        rtcSession.answer(options);

        // rtcSession.answer({
        //     mediaConstraints: {
        //         audio: true,
        //         video: false
        //     },
        //     pcConfig: {
        //         iceServers: [
        //             // optional
        //             { urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19305"] }
        //             // { urls: "turn:example.com", username: "foo", credential: "1234" }
        //         ]
        //     }
        // });
    };
    // end answerCall

    // stop call
    const stopCall = () => {
        setCallStatus(CALL_STATUS_STOPPING);
        UA.terminateSessions();
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

        reinitializeJsSIP();
    }, []);

    return (
        <JsSipContext.Provider
            value={{
                UA,
                startCall,
                stopCall,
                answerCall,
                remoteAudio,
                rtcSession
            }}
        >
            {children}
        </JsSipContext.Provider>
    );
};

export default JsSipContext;
