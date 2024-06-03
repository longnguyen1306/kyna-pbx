import {
    Flex,
    useMantineTheme,
    Text,
    Input,
    ActionIcon,
    Dialog,
    Button,
    ScrollArea,
    Radio,
    Group,
    Loader
} from "@mantine/core";
import { IconHistory, IconPhone, IconArrowLeft, IconAt } from "@tabler/icons-react";
import { useDisclosure, useHover } from "@mantine/hooks";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import JsSipContext from "../../providers/sips/JsSipProvider";
import { useDispatch, useSelector } from "react-redux";
import { handleSetCallStatus, handleSetInCall } from "../../redux/slices/jsSipSlice";
import InCall from "./components/InCall";
import CallHistoryItem from "./components/CallHistoryItem";
import cdrApis from "../../lib/api/cdrApis";

const regexPhone = new RegExp("^[0-9]+$");

const CallPage = () => {
    const theme = useMantineTheme();
    const [phoneNumber, setPhoneNumber] = useState("");
    const { stopCall, rtcSession, answerCall, startCall } = useContext(JsSipContext);
    const { inCall } = useSelector((state) => state.jsSip);
    const dispatch = useDispatch();
    const [opened, { toggle, close }] = useDisclosure(false);
    const [checkBoxFilterData, setCheckBoxFilterData] = useState("all");

    const [loading, setLoading] = useState(false);
    const [cdrData, setCdrData] = useState([]);

    const handleClickCall = () => {
        if (!regexPhone.test(phoneNumber) || phoneNumber.length <= 4) {
            return toast.error("Số điện thoại không hợp lệ");
        }
        dispatch(handleSetInCall(true));

        startCall(phoneNumber);
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
            toggle();
            rtcSession.on("peerconnection", function (data) {
                data.peerconnection.addEventListener("addstream", function (e) {
                    const audio = document.createElement("audio");
                    audio.srcObject = e.stream;
                    audio.play();
                });
            });
            rtcSession.on("progress", function (e) {
                console.log("call is in progress", e);
                dispatch(handleSetCallStatus("progress"));
            });
            rtcSession.on("failed", function (e) {
                console.log("call is in failed", e);
                dispatch(handleSetCallStatus("failed"));
                close();
            });
            rtcSession.on("ended", function (e) {
                console.log("call is in ended", e);
                dispatch(handleSetCallStatus("ended"));
                toast.info("cuộc goọi đã kết thúc");
            });
            rtcSession.on("confirmed", function (e) {
                console.log("call is in confirmed", e);
                dispatch(handleSetCallStatus("confirmed"));
            });
        }
    }, [rtcSession]);

    const handleClickAnswerCall = () => {
        close();
        dispatch(handleSetInCall(true));
        answerCall();
    };

    // cdr data

    const getCdrData = async () => {
        setLoading(true);
        const res = await cdrApis.getCdrByUser();

        if (res?.code === "error") {
            return toast.error(res.message);
        }
        setCdrData(res?.data);
        setLoading(false);
    };

    useEffect(() => {
        getCdrData();
    }, []);

    return (
        <>
            <Flex>
                <Flex
                    direction='column'
                    justify='space-between'
                    w={360}
                    bg={theme.colors.gray[0]}
                    style={{
                        height: "calc(100vh - 60px)"
                    }}
                >
                    <Flex
                        bg='white'
                        gap={8}
                        py={16}
                        px={16}
                        style={{
                            cursor: "pointer"
                        }}
                        onClick={() => dispatch(handleSetInCall(false))}
                    >
                        <IconHistory /> Lịch sử cuộc gọi
                    </Flex>

                    <Flex h={"70%"} direction={"column"} justify={"space-between"}>
                        <Flex direction='column' align='center' gap={20}>
                            <Input
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                w='100%'
                                size={"md"}
                                placeholder='Nhập số điện thoại cần gọi...'
                            />

                            <ActionIcon
                                onClick={handleClickCall}
                                variant='filled'
                                color='indigo'
                                size={50}
                                radius='xl'
                                aria-label='Settings'
                            >
                                <IconPhone style={{ width: "60%", height: "60%" }} stroke={1.5} />
                            </ActionIcon>
                        </Flex>

                        <Flex>ss</Flex>

                        <Flex mb={40} align='center' justify='space-between'>
                            <Flex></Flex>

                            {/*<ActionIcon*/}
                            {/*    onClick={handleClickCall}*/}
                            {/*    variant='filled'*/}
                            {/*    color='indigo'*/}
                            {/*    size={60}*/}
                            {/*    radius='xl'*/}
                            {/*    aria-label='Settings'*/}
                            {/*>*/}
                            {/*    <IconPhone style={{ width: "60%", height: "60%" }} stroke={1.5} />*/}
                            {/*</ActionIcon>*/}

                            <Flex></Flex>
                        </Flex>
                    </Flex>
                </Flex>

                <Flex w={"100%"}>
                    {inCall ? (
                        <InCall phoneNumber={phoneNumber} />
                    ) : (
                        <Flex direction='column' w={"100%"} px={30} gap={20}>
                            <Flex direction='column' justify='space-between' h={100}>
                                <Flex h={"50%"} align={"center"} justify='space-between'>
                                    <Flex align={"center"} gap={10}>
                                        <IconArrowLeft size={18} />
                                        <Text>Lịch sử cuộc gọi hôm nay</Text>
                                    </Flex>

                                    <Flex align={"center"} gap={10}>
                                        <Text>
                                            {loading ? (
                                                <Loader color='indigo' type='dots' size={22} />
                                            ) : (
                                                cdrData?.length
                                            )}
                                        </Text>
                                        <Text>Cuộc gọi</Text>
                                    </Flex>
                                </Flex>

                                <Flex h={"50%"} align={"center"} justify={"space-between"}>
                                    <Flex>
                                        <Radio.Group
                                            name='favoriteFramework'
                                            value={checkBoxFilterData}
                                            onChange={setCheckBoxFilterData}
                                        >
                                            <Group mt='xs'>
                                                <Radio
                                                    color='indigo'
                                                    value='all'
                                                    label='All'
                                                    styles={{
                                                        label: {
                                                            cursor: "pointer",
                                                            textTransform: "uppercase"
                                                        }
                                                    }}
                                                />
                                                <Radio
                                                    color='indigo'
                                                    value='noAnswer'
                                                    label='no answer'
                                                    styles={{
                                                        label: {
                                                            cursor: "pointer",
                                                            textTransform: "uppercase"
                                                        }
                                                    }}
                                                />
                                                <Radio
                                                    color='indigo'
                                                    value='answered'
                                                    label='answered'
                                                    styles={{
                                                        label: {
                                                            cursor: "pointer",
                                                            textTransform: "uppercase"
                                                        }
                                                    }}
                                                />
                                                <Radio
                                                    color='indigo'
                                                    value='failed'
                                                    label='failed'
                                                    styles={{
                                                        label: {
                                                            cursor: "pointer",
                                                            textTransform: "uppercase"
                                                        }
                                                    }}
                                                />
                                            </Group>
                                        </Radio.Group>
                                    </Flex>

                                    <Flex>
                                        <Input
                                            leftSection={
                                                loading ? (
                                                    <Loader color='indigo' type='dots' size={22} />
                                                ) : null
                                            }
                                            disabled={loading}
                                            size='md'
                                            radius='md'
                                            placeholder='Tìm số điện thoại...'
                                            w={300}
                                        />
                                    </Flex>
                                </Flex>
                            </Flex>

                            <ScrollArea
                                // offsetScrollbars
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
                                        {cdrData.length > 0 ? (
                                            cdrData?.map((item, index) => {
                                                return <CallHistoryItem key={index} item={item} />;
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
                    {rtcSession?.remote_identity.display_name}
                </Text>

                <Text size='md' fw={500} py={6} c={theme.colors.indigo[6]}>
                    {rtcSession?.remote_identity?.uri.user}
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
                    <Button onClick={close} color={"gray"}>
                        Thoát
                    </Button>
                </Flex>
            </Dialog>
        </>
    );
};

export default CallPage;
