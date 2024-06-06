import { Button, Flex, Modal, Text, Textarea, useMantineTheme } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import JsSipContext from "../../../providers/sips/JsSipProvider";
import { useSelector } from "react-redux";
import { fancyTimeFormat } from "../../../lib/utils/dateTimeFunction";
import moment from "moment";
import ReactAudioPlayer from "react-audio-player";
import cdrApis from "../../../lib/api/cdrApis";
import { useDisclosure } from "@mantine/hooks";
import CallNoteList from "./CallNoteList";
import { toast } from "react-toastify";
import callListApis from "../../../lib/api/callListApis";

const InCall = ({ inCallData, setInCallData, checkInCallData }) => {
    const theme = useMantineTheme();
    const { stopCall, rtcSession, startCall } = useContext(JsSipContext);
    const { callStatus, callDirection } = useSelector((state) => state.jsSip);
    const [time, setTime] = useState(0);
    const [displayName, setDisplayName] = useState(null);
    const [callPhoneNumber, setCallPhoneNumber] = useState(null);

    const [callHistory, setCallHistory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const [note, setNote] = useState("");

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
        const getCdrByPhoneNumber = async () => {
            setLoading(true);

            const res = await cdrApis.getCdrsByPhone(inCallData?.phoneNumber);

            setCallHistory(res.data);

            setLoading(false);
        };
        getCdrByPhoneNumber();
    }, [inCallData]);

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

    const getCdrByPhoneNumber = async () => {
        setLoading(true);

        const res = await cdrApis.getCdrsByPhone(callPhoneNumber?.phoneNumber);

        setCallHistory(res.data);

        setLoading(false);
    };

    useEffect(() => {
        getCdrByPhoneNumber();
    }, []);

    const handleAddNote = async () => {
        if (note?.length === 0) {
            toast.error("Nhập nội dung note...");
            return;
        }

        const res = await callListApis.updateNoteByCall(inCallData?._id, inCallData.name, note);

        if (res?.code === "success") {
            toast.success("Thêm note thành công");

            checkInCallData(inCallData.phoneNumber);

            setNote("");
        } else {
            console.log("res", res);
            toast.error(res?.message);
        }
    };

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

                <Text>{inCallData?.name}</Text>

                <Text>{inCallData?.phoneNumber}</Text>

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

                {callStatus === "stop" || callStatus === "ended" || callStatus === "failed" ? (
                    <Button
                        color='green'
                        size={"md"}
                        onClick={() => startCall(inCallData?.phoneNumber)}
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
                    <Textarea
                        resize='vertical'
                        size='md'
                        placeholder='Nhập ghi chú...'
                        rows={4}
                        w={500}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                    <Button onClick={handleAddNote} color='indigo'>
                        Lưu
                    </Button>
                </Flex>
            </Flex>

            <Flex px={20} justify='space-between'>
                <Flex bg='white' w={"50%"} p={20}>
                    <Flex direction='column'>
                        {inCallData?.noteList?.length > 0
                            ? inCallData?.noteList.map((itemCall, index) => (
                                  <CallNoteList key={index} item={itemCall} />
                              ))
                            : "null"}
                    </Flex>
                </Flex>

                <Flex bg='white' w={"50%"} p={20} direction='column'>
                    <Text>Lịch sử cuộc gọi</Text>
                    {callHistory?.map((item, index) => (
                        <Flex
                            key={index}
                            p={30}
                            direction='column'
                            gap={4}
                            style={{
                                borderBottomColor: theme.colors.gray[2],
                                borderBottomStyle: "solid"
                            }}
                        >
                            <Flex fz={14} gap={6}>
                                CdrID:
                                <Text
                                    fz={14}
                                    span
                                    style={{
                                        fontStyle: "italic"
                                    }}
                                >
                                    {item?.cdrId}
                                </Text>
                            </Flex>

                            <Flex fz={14} gap={6}>
                                Ngày:
                                <Text
                                    fz={14}
                                    span
                                    style={{
                                        fontStyle: "italic"
                                    }}
                                >
                                    {moment(item?.callDate).utcOffset(14).format("DD/MM/YYYY, HH:mm:ss")}
                                </Text>
                            </Flex>

                            <Flex fz={14} gap={4}>
                                Loại cuộc gọi:
                                <Text
                                    fz={14}
                                    span
                                    c={
                                        item?.callType === "3"
                                            ? theme.colors.green[5]
                                            : item?.callType === "2"
                                              ? theme.colors.indigo[5]
                                              : theme.colors.red[5]
                                    }
                                >
                                    {item?.callType === "3"
                                        ? "OUTGOING"
                                        : item?.callType === "2"
                                          ? "INCOMING"
                                          : item?.callType === "1" || item?.callType === "4"
                                            ? "INTERNAL"
                                            : "FAILED"}
                                </Text>
                            </Flex>

                            <Flex fz={14} gap={6}>
                                Gọi đến số:
                                <Text fz={14} span>
                                    {item?.destination}
                                </Text>
                            </Flex>

                            <Flex fz={14} gap={6}>
                                Trạng thái:
                                <Text
                                    fz={14}
                                    span
                                    c={
                                        item?.disposition === "ANSWERED"
                                            ? theme.colors.green[5]
                                            : item?.disposition === "NO ANSWER"
                                              ? theme.colors.orange[5]
                                              : theme.colors.red[5]
                                    }
                                >
                                    {item?.disposition}
                                </Text>
                            </Flex>

                            <Flex fz={14} gap={6}>
                                Tổng thời gian gọi:
                                <Text fz={14} span>
                                    {fancyTimeFormat(item?.duration)}
                                </Text>
                            </Flex>

                            <Flex fz={14} gap={6}>
                                Thời gian đàm thoại:
                                <Text fz={14} span>
                                    {fancyTimeFormat(item?.billSec)}
                                </Text>
                            </Flex>

                            <Flex fz={14} align={"center"} gap={10}>
                                Ghi âm:
                                <Modal opened={opened} onClose={close} withCloseButton={false}>
                                    <Flex direction='column' gap={4} align={"center"}>
                                        <ReactAudioPlayer
                                            src={`${import.meta.env.VITE_PBX_DOMAIN}${item?.recFile}`}
                                            controls
                                        />
                                    </Flex>
                                </Modal>
                                {item?.recFile ? (
                                    <Button size='xs' color='indigo' onClick={open}>
                                        Nghe ghi âm
                                    </Button>
                                ) : (
                                    <div>null</div>
                                )}
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default InCall;
