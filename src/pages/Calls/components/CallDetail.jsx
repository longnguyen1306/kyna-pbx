import { Button, Flex, Modal, Text, useMantineTheme } from "@mantine/core";
import moment from "moment/moment";
import { fancyTimeFormat } from "../../../lib/utils/dateTimeFunction";
import ReactAudioPlayer from "react-audio-player";
import { useDisclosure } from "@mantine/hooks";

const CallDetail = ({ item, call }) => {
    const theme = useMantineTheme();
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <Flex
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
                    {moment(item?.callDate).format("DD/MM/YYYY, HH:mm:ss")}
                </Text>
            </Flex>

            <Flex fz={14} gap={6}>
                Người gọi:
                <Text
                    fz={14}
                    span
                    style={{
                        fontStyle: "italic"
                    }}
                >
                    {item?.callBy}
                </Text>
            </Flex>

            <Flex fz={14} gap={6}>
                DID:
                <Text
                    fz={14}
                    span
                    style={{
                        fontStyle: "italic"
                    }}
                >
                    {item?.did ? item?.did : "null"}
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
                            autoPlay
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
    );
};

export default CallDetail;
