import { Flex, Text, useMantineTheme } from "@mantine/core";
import moment from "moment/moment";
import { fancyTimeFormat } from "../../../lib/utils/dateTimeFunction";

const CallDetail = ({ item, call }) => {
    const theme = useMantineTheme();

    console.log("call", call);

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
                    {moment(item?.timeCall).utcOffset(14).format("DD/MM/YYYY, HH:mm:ss")}
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
                    {call?.agent.email}
                </Text>
            </Flex>

            <Flex fz={14} gap={4}>
                Loại cuộc gọi:
                <Text
                    fz={14}
                    span
                    c={
                        item?.calltype === "3"
                            ? theme.colors.green[5]
                            : item?.calltype === "2"
                              ? theme.colors.indigo[5]
                              : theme.colors.red[5]
                    }
                >
                    {item?.calltype === "3"
                        ? "OUTGOING"
                        : item?.calltype === "2"
                          ? "INCOMING"
                          : item?.calltype === "1" || item?.calltype === "4"
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
                    {fancyTimeFormat(item?.billsec)}
                </Text>
            </Flex>

            <Flex fz={14} align={"center"} gap={10}>
                Ghi âm:
                {item?.recfile ? (
                    <audio controls preload='auto'>
                        <source
                            src={`${import.meta.env.VITE_PBX_DOMAIN}${item?.recfile}`}
                            type='audio/x-wav'
                        />
                    </audio>
                ) : (
                    <div>null</div>
                )}
            </Flex>
        </Flex>
    );
};

export default CallDetail;
