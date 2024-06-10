import { Flex, useMantineTheme, Text, Dialog, Button, ScrollArea, Loader } from "@mantine/core";
import { IconHistory } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import JsSipContext from "../../providers/sips/JsSipProvider";
import { useDispatch, useSelector } from "react-redux";
import { handleSetCallStatus, handleSetInCall } from "../../redux/slices/jsSipSlice";
import InCall from "./components/InCall";
import CallHistoryItem from "./components/CallHistoryItem";
import styles from "../../assets/styles/Calls.module.scss";
import CallPanel from "./components/CallPanel";
import PageToolBar from "./components/PageToolBar";
import callInAudioFile from "../../assets/audio/ringIncomingCall.mp3";
import callHistoryApis from "../../lib/api/callHistoryApis";
import {
    CALL_STATUS_CONFIRMED,
    CALL_STATUS_ENDED,
    CALL_STATUS_FAILED,
    CALL_STATUS_PROGRESS,
    CALL_STATUS_STARTING
} from "../../providers/sips/libs/enums";

const regexPhone = new RegExp("^[0-9]+$");

const CallPage = () => {
    const theme = useMantineTheme();
    const [phoneNumber, setPhoneNumber] = useState("");
    const { stopCall, rtcSession, answerCall, startCall, originator } = useContext(JsSipContext);
    const { inCall } = useSelector((state) => state.jsSip);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [opened, { toggle, close }] = useDisclosure(false);

    const [loading, setLoading] = useState(false);
    const [cdrData, setCdrData] = useState([]);
    const [inCallData, setInCallData] = useState(null);

    const [activePage, setPage] = useState(1);
    const callInAudio = new Audio(callInAudioFile);

    const checkInCallData = async (number) => {
        const call = await callHistoryApis.getCallByPhoneAndEmail(number);

        if (call.code === "success") {
            setInCallData(call?.data);
            await callHistoryApis.updateTimeUpdated(call?.data?._id);
        } else {
            if (originator === "remote") {
                const newCall = await callHistoryApis.createNewCall(
                    rtcSession ? rtcSession?.remote_identity?.uri?.user : null
                );

                console.log("newCall", newCall);

                if (newCall?.code === "success") {
                    setInCallData(newCall?.data);
                }
            } else {
                const newCall = await callHistoryApis.createNewCall(phoneNumber);

                console.log("newCall", newCall);

                if (newCall?.code === "success") {
                    setInCallData(newCall?.data);
                }
            }
        }
    };

    const handleClickCall = async (phone = null) => {
        if (phone) {
            dispatch(handleSetInCall(true));

            checkInCallData(phone).then(() => {
                startCall(phone);
            });
        } else {
            if (!regexPhone.test(phoneNumber) || phoneNumber.length <= 4) {
                return toast.error("Số điện thoại không hợp lệ");
            }
            dispatch(handleSetInCall(true));

            checkInCallData(phoneNumber).then(() => {
                startCall(phoneNumber);
            });
        }
    };

    useEffect(() => {
        if (rtcSession && rtcSession?.direction === "outgoing") {
            rtcSession.connection.addEventListener("addstream", (e) => {
                const audio = document.createElement("audio");
                audio.srcObject = e.stream;
                audio.play();
            });
        }

        if (rtcSession && rtcSession?.direction === "incoming") {
            checkInCallData(rtcSession?.remote_identity?.uri.user);

            if (!rtcSession.isEnded()) {
                toggle();
            }

            if (rtcSession?.isInProgress()) {
                callInAudio.loop = true;
                callInAudio.play();
            }

            rtcSession.on("peerconnection", function (data) {
                data.peerconnection.addEventListener("addstream", function (e) {
                    const audio = document.createElement("audio");
                    audio.srcObject = e.stream;
                    audio.play();
                });
            });
            rtcSession.on("connecting", function (e) {
                console.log("call is in connecting", e);
                dispatch(handleSetCallStatus(CALL_STATUS_STARTING));
            });
            rtcSession.on("progress", function (e) {
                console.log("call is in progress", e);
                dispatch(handleSetCallStatus(CALL_STATUS_PROGRESS));
            });
            rtcSession.on("failed", function (e) {
                callInAudio.loop = false;
                callInAudio.pause();
                getCdrData();
                console.log("call is in failed", e);
                dispatch(handleSetCallStatus(CALL_STATUS_FAILED));
                close();
            });
            rtcSession.on("ended", function (e) {
                callInAudio.loop = false;
                callInAudio.pause();
                getCdrData();
                console.log("call is in ended", e);
                dispatch(handleSetCallStatus(CALL_STATUS_ENDED));
                toast.info("cuộc goọi đã kết thúc");
            });
            rtcSession.on("confirmed", function (e) {
                callInAudio.loop = false;
                callInAudio.pause();
                console.log("call is in confirmed", e);
                dispatch(handleSetCallStatus(CALL_STATUS_CONFIRMED));
            });
        }
    }, [rtcSession]);

    // console.log("rtcSession", rtcSession.remote_identity.uri.user);
    console.log("originator", originator);

    const handleClickAnswerCall = () => {
        close();
        dispatch(handleSetInCall(true));
        answerCall();
    };

    // cdr data
    const getCdrData = async () => {
        setLoading(true);
        const res = await callHistoryApis.getCallByEmail(activePage);

        if (!res) return toast.error("Lỗi");

        if (res?.code === "error") {
            return toast.error(res.message);
        }
        setCdrData(res?.data);
        setLoading(false);
    };

    useEffect(() => {
        getCdrData();
    }, [inCall, activePage]);

    useEffect(() => {
        if (inCall !== true) {
            if (rtcSession) {
                stopCall();
            }
        }
    }, [inCall]);

    return (
        <>
            <Flex className={styles.wrapper}>
                <Flex direction='column' justify='space-between' className={styles.callArea}>
                    <Flex
                        className={styles.linkNav}
                        onClick={() => dispatch(handleSetInCall(false))}
                        gap={10}
                    >
                        <IconHistory /> Lịch sử cuộc gọi
                    </Flex>

                    <Flex h={"70%"} direction='column' justify={"space-between"} className={styles.calls}>
                        <CallPanel
                            phoneNumber={phoneNumber}
                            handleClickCall={handleClickCall}
                            setPhoneNumber={setPhoneNumber}
                        />
                    </Flex>
                </Flex>

                <Flex className={styles.callHistory}>
                    {inCall ? (
                        <InCall
                            inCall={inCall}
                            phoneNumber={phoneNumber}
                            inCallData={inCallData}
                            checkInCallData={checkInCallData}
                            setInCallData={setInCallData}
                        />
                    ) : (
                        <Flex direction='column' w={"100%"} px={30} gap={20}>
                            <PageToolBar
                                cdrData={cdrData}
                                setPage={setPage}
                                activePage={activePage}
                                loading={loading}
                            />

                            <ScrollArea
                                scrollbarSize={8}
                                scrollbars='y'
                                type='auto'
                                bg='white'
                                style={{
                                    height: "calc(100vh - 180px)",
                                    width: "100%",
                                    borderRightColor: theme.colors.gray[1],
                                    borderRightStyle: "solid"
                                }}
                            >
                                {!loading ? (
                                    <>
                                        {cdrData?.docs?.length > 0 ? (
                                            cdrData?.docs?.map((item, index) => {
                                                return (
                                                    <CallHistoryItem
                                                        getCdrData={getCdrData}
                                                        key={index}
                                                        item={item}
                                                        handleClickCall={handleClickCall}
                                                    />
                                                );
                                            })
                                        ) : (
                                            <Flex p={20}>Không có cuộc gọi nào</Flex>
                                        )}
                                    </>
                                ) : (
                                    <Flex align='center' justify='center' py={50}>
                                        <Loader color='indigo' size='md' />
                                    </Flex>
                                )}
                            </ScrollArea>
                        </Flex>
                    )}
                </Flex>
            </Flex>

            <Dialog
                opened={opened}
                withCloseButton
                position={{ top: 20, right: 20 }}
                onClose={close}
                size='lg'
                radius='md'
                px={40}
                bg={theme.colors.indigo[1]}
            >
                <Text size='md' fw={500} py={6} c={theme.colors.gray[8]}>
                    Cuộc gọi đến
                </Text>

                <Text size='md' fw={500} py={6} c={theme.colors.indigo[6]}>
                    {inCallData?.name}
                </Text>

                <Text size='md' fw={500} py={6} c={theme.colors.indigo[6]}>
                    {inCallData?.phoneNumber}
                </Text>

                <Flex align='center' justify='space-between' py={10}>
                    <Button
                        onClick={handleClickAnswerCall}
                        color={"green"}
                        style={{
                            color: "white"
                        }}
                    >
                        Nghe
                    </Button>
                    <Button onClick={stopCall} color={"red"}>
                        Tắt máy
                    </Button>
                </Flex>
            </Dialog>
        </>
    );
};

export default CallPage;
