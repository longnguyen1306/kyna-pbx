import { Button, Flex, Text, Textarea, useMantineTheme } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import JsSipContext from "../../../providers/sips/JsSipProvider";
import { useSelector } from "react-redux";
import { fancyTimeFormat } from "../../../lib/utils/dateTimeFunction";

const InCall = ({ inCallData }) => {
    const theme = useMantineTheme();
    const { stopCall, rtcSession } = useContext(JsSipContext);
    const { callStatus, callDirection } = useSelector((state) => state.jsSip);
    const [time, setTime] = useState(0);
    const [displayName, setDisplayName] = useState(null);
    const [callPhoneNumber, setCallPhoneNumber] = useState(null);

    console.log("inCallData", inCallData);

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

    useEffect(() => {
        setDisplayName(() => {
            if (rtcSession?.direction === "outgoing") {
                // call api get name
                return "aa";
            } else if (rtcSession?.direction === "incoming") {
                return rtcSession?.remote_identity?.display_name;
            }
        });

        setCallPhoneNumber(() => {
            if (rtcSession?.direction === "outgoing") {
                return rtcSession?.remote_identity?.uri?.user;
            } else if (rtcSession?.direction === "incoming") {
                return rtcSession?.remote_identity?.uri?.user;
            }
        });
    }, [rtcSession]);

    return (
        <Flex direction='column' w={"100%"} gap={40}>
            <Flex
                h={100}
                bg={theme.colors.indigo[5]}
                w={"100%"}
                c={"white"}
                align='center'
                justify='space-around'
            >
                <Text>{callDirection === "OUTGOING" ? "Gọi đi" : "Gọi đến"}</Text>
                <Text>{displayName}</Text>
                <Text>{callPhoneNumber}</Text>

                <Text>
                    {callStatus === "connecting"
                        ? "Đang kết nối"
                        : callStatus === "progress"
                          ? "Đang đổ chuông"
                          : callStatus === "confirmed"
                            ? fancyTimeFormat(time)
                            : callStatus === "ended"
                              ? `Kết thúc`
                              : callStatus}
                </Text>

                {callStatus === "stop" ? (
                    <Button
                        color='green'
                        size={"md"}
                        onClick={stopCall}
                        style={{
                            color: "white"
                        }}
                    >
                        Gọi lại
                    </Button>
                ) : (
                    <Button color='red' size={"md"} onClick={stopCall}>
                        Tắt máy
                    </Button>
                )}
            </Flex>

            <Flex px={20}>
                <Flex align='center' gap={20}>
                    <Textarea resize='vertical' size='md' placeholder='Nhập ghi chú...' rows={4} w={500} />
                    <Button color='indigo'>Lưu</Button>
                </Flex>
            </Flex>

            <Flex px={20}>
                <Flex bg='white' w={"100%"} p={20}>
                    Danh sách ghi chú
                </Flex>
            </Flex>
        </Flex>
    );
};

export default InCall;
