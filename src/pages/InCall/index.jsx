import { useLocation } from "react-router-dom";
import { Button, Flex, Text, Textarea, useMantineTheme } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import JsSipContext from "../../providers/sips/JsSipProvider";
import { fancyTimeFormat } from "../../lib/utils/dateTimeFunction";
import { toast } from "react-toastify";

const InCallPage = () => {
    const location = useLocation();
    const theme = useMantineTheme();
    const [time, setTime] = useState(0);
    const [callStatus, setCallStatus] = useState(null);
    const [callType, setCallType] = useState(() => {
        const { callType } = location.state;
        return callType ? callType : null;
    });

    const [phoneNumber, setPhoneNumber] = useState(() => {
        const { phoneNumber } = location.state;
        return phoneNumber ? phoneNumber : null;
    });

    const { UA, stopCall, answerCall, rtcSession } = useContext(JsSipContext);

    const eventHandlers = {
        connecting: function (e) {
            console.log("call is in progress", e);
            setCallStatus("connecting");
        },
        progress: function (e) {
            console.log("call is in progress", e);
            setCallStatus("progress");
        },
        failed: function (e) {
            console.log("call failed with cause: ", e);
            setCallStatus("failed");
        },
        ended: async function (e) {
            console.log("call ended with cause: ", e);
            setCallStatus("ended");
            toast.info("cuộc goọi đã kết thúc");
        },
        confirmed: function (e) {
            console.log("call confirmed", e);
            setCallStatus("confirmed");
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
        // sessionTimersExpires
    };

    const startCall = (destination) => {
        UA?.call(destination, options);
    };

    useEffect(() => {
        if (callType === "callOut") {
            setTimeout(() => {
                startCall(phoneNumber);
            }, 2000);
        }
    }, []);

    useEffect(() => {
        if (rtcSession && rtcSession?.direction === "outgoing") {
            rtcSession.connection.addEventListener("addstream", (e) => {
                const audio = document.createElement("audio");
                audio.srcObject = e.stream;
                audio.play();
            });
        } else if (rtcSession?.direction === "incoming") {
            rtcSession.on("accepted", function () {
                console.log("the call has answered");
            });
            rtcSession.on("confirmed", function () {
                console.log("this handler will be called for incoming calls too");
            });
            rtcSession.on("ended", function () {
                console.log("the call has ended");
            });
            rtcSession.on("failed", function () {
                console.log(" unable to establish the call");
            });
            rtcSession.on("connecting", function (e) {
                console.log("in connecting");
            });
            rtcSession.on("peerconnection", function (data) {
                data.peerconnection.addEventListener("addstream", function (e) {
                    // set remote audio stream
                    const audio = document.createElement("audio");
                    audio.srcObject = e.stream;
                    audio.play();
                });
            });
        }
    }, [rtcSession]);

    useEffect(() => {
        let idTime;
        if (callStatus === "confirmed") {
            idTime = setInterval(() => {
                setTime(time + 1);
            }, 1000);
        } else {
            setTime(0);
        }
        return () => clearInterval(idTime);
    }, [callStatus, time]);

    const handleHangupCall = () => {
        stopCall();
        setCallType(null);
    };

    return (
        <Flex direction={"column"} px={20}>
            <Flex py={20}>
                <Text>Đang thực hiện cuộc gọi</Text>
            </Flex>

            <Flex
                bg={theme.colors.indigo[6]}
                py={14}
                align={"center"}
                justify={"space-around"}
                c='white'
                style={{
                    borderRadius: 6
                }}
            >
                <Text span>{callType === "callOut" ? "Đang gọi đi" : "Gọi đến"}</Text>
                <Text span>/</Text>
                <Text span onClick={answerCall}>
                    {phoneNumber}
                </Text>
                <Text span>
                    {callStatus === "connecting"
                        ? "Đang kết nối"
                        : callStatus === "progress"
                          ? "Đang đổ chuông"
                          : callStatus === "confirmed"
                            ? fancyTimeFormat(time)
                            : callStatus === "ended"
                              ? "Đã kết thúc"
                              : "--"}
                </Text>
                <Button onClick={handleHangupCall} bg={theme.colors.red[7]}>
                    Tắt máy
                </Button>
            </Flex>

            <Flex py={40} gap={10}>
                <Textarea
                    size='md'
                    radius='md'
                    placeholder='Nhập ghi chú cho cuộc gọi này...'
                    w={"50%"}
                    rows={4}
                />
                <Button color={theme.colors.indigo[6]}>Lưu ghi chú</Button>
            </Flex>
        </Flex>
    );
};

export default InCallPage;
