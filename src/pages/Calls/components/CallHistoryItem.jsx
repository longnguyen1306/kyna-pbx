import { ActionIcon, Flex, ScrollArea, Text, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useHover } from "@mantine/hooks";
import {
    IconArrowDownLeft,
    IconArrowUpRight,
    IconBan,
    IconNote,
    IconPhoneOutgoing
} from "@tabler/icons-react";
import Sidebar from "../../../components/Sidebar";
import { fancyTimeFormat } from "../../../lib/utils/dateTimeFunction";

const CallHistoryItem = ({ item }) => {
    const theme = useMantineTheme();
    const [openNoteHistory, setOpenHistory] = useState(false);
    const { hovered, ref } = useHover();

    console.log(item);

    return (
        <Flex w={"100%"} direction={"column"}>
            <Flex
                ref={ref}
                w={"100%"}
                px={20}
                h={76}
                align={"center"}
                justify={"space-between"}
                style={{
                    borderBottomColor: theme.colors.gray[1],
                    borderBottomStyle: "solid",
                    cursor: "pointer",
                    backgroundColor: openNoteHistory
                        ? theme.colors.gray[2]
                        : hovered
                          ? theme.colors.gray[2]
                          : null
                }}
            >
                <Flex align={"center"} gap={16} w={"100%"}>
                    <Flex
                        h={40}
                        w={40}
                        c='white'
                        align={"center"}
                        justify={"center"}
                        fz={14}
                        bg={theme.colors.indigo[7]}
                        style={{
                            borderRadius: "50%"
                        }}
                    >
                        802
                    </Flex>

                    <Flex
                        w={"100%"}
                        h={66}
                        direction={"column"}
                        gap={2}
                        justify={"center"}
                        onClick={() => setOpenHistory(!openNoteHistory)}
                    >
                        <Text fz={13} c={theme.colors.gray[7]} fw={500}>
                            {item?.destination} - tên khách hàng
                        </Text>

                        <Flex fz={10}>
                            <Text
                                c={theme.colors.gray[5]}
                                fz={13}
                                pr={10}
                                mr={10}
                                style={{
                                    borderRight: `1px solid ${theme.colors.gray[5]}`
                                }}
                            >
                                {item?.calldate}
                            </Text>

                            <Text
                                c={
                                    item?.calltype === "3"
                                        ? theme.colors.green[5]
                                        : item?.calltype === "2"
                                          ? theme.colors.indigo[5]
                                          : theme.colors.red[5]
                                }
                                fz={13}
                                pr={10}
                                mr={10}
                                style={{
                                    borderRight: `1px solid ${theme.colors.gray[5]}`
                                }}
                            >
                                {item?.calltype === "3"
                                    ? "OUTGOING"
                                    : item?.calltype === "2"
                                      ? "INCOMING"
                                      : item?.calltype === "1" || item?.calltype === "4"
                                        ? "INTERNAL"
                                        : "FAILED"}
                            </Text>

                            <Text
                                c={
                                    item?.disposition === "ANSWERED"
                                        ? theme.colors.green[5]
                                        : item?.disposition === "NO ANSWER"
                                          ? theme.colors.orange[5]
                                          : theme.colors.red[5]
                                }
                                fz={13}
                                pr={10}
                                mr={10}
                                style={{
                                    borderRight: `1px solid ${theme.colors.gray[5]}`
                                }}
                            >
                                {item?.disposition}
                            </Text>

                            <Text c={theme.colors.gray[5]} fz={13}>
                                duration: {fancyTimeFormat(item?.billsec)}
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>

                <Flex align={"center"} gap={10}>
                    <ActionIcon
                        data-tooltip-id='app-tooltip'
                        data-tooltip-content='Ghi chú cho cuộc gọi này!'
                        variant='subtle'
                        color={theme.colors.gray[5]}
                        size='xl'
                        radius='xl'
                        aria-label='Settings'
                    >
                        <IconNote style={{ width: "50%", height: "50%" }} stroke={1.5} />
                    </ActionIcon>

                    <ActionIcon
                        data-tooltip-id='app-tooltip'
                        data-tooltip-content='Gọi lại số này!'
                        variant='subtle'
                        color={theme.colors.gray[5]}
                        size='xl'
                        radius='xl'
                        aria-label='Settings'
                    >
                        <IconPhoneOutgoing style={{ width: "50%", height: "50%" }} stroke={1.5} />
                    </ActionIcon>

                    <IconBan size={17} color={theme.colors.red[6]} />
                    {/*<IconArrowDownLeft size={17} color={theme.colors.indigo[6]} />*/}
                    {/*<IconArrowUpRight size={17} color={theme.colors.green[6]} />*/}
                </Flex>
            </Flex>

            {openNoteHistory && (
                <ScrollArea
                    // offsetScrollbars
                    scrollbarSize={8}
                    scrollbars='y'
                    type='auto'
                    bg='white'
                    style={{
                        height: 500,
                        borderRightColor: theme.colors.gray[1],
                        borderRightStyle: "solid"
                    }}
                >
                    <Flex
                        direction='column'
                        px={50}
                        style={{
                            borderBottomColor: theme.colors.gray[2],
                            borderBottomStyle: "solid"
                        }}
                    >
                        <Flex
                            style={{
                                borderBottomColor: theme.colors.gray[2],
                                borderBottomStyle: "solid"
                            }}
                        >
                            <Flex py={30} direction='column'>
                                <Text fz={14}>
                                    Ngày tạo:{" "}
                                    <Text fz={14} span>
                                        2024-05-31 17:38:01
                                    </Text>
                                </Text>
                                <Text fz={14}>
                                    Người tạo:{" "}
                                    <Text fz={14} span>
                                        long.nguyen@kynaforkids.vn
                                    </Text>
                                </Text>
                                <Text fz={14}>
                                    Nội dung ghi chú:{" "}
                                    <Text fz={14} span>
                                        long.nguyen@kynaforkids.vn
                                    </Text>
                                </Text>
                            </Flex>
                        </Flex>

                        <Flex py={30} direction='column'>
                            <Text fz={14}>
                                CdrID:{" "}
                                <Text fz={14} span>
                                    214141341
                                </Text>
                            </Text>
                            <Text fz={14}>
                                Ngày:{" "}
                                <Text fz={14} span>
                                    2024-05-31 17:38:01
                                </Text>
                            </Text>
                            <Text fz={14}>
                                Người gọi:{" "}
                                <Text fz={14} span>
                                    long.nguyen@kynaforkids.vn
                                </Text>
                            </Text>
                            <Text fz={14}>
                                Loại cuộc gọi:{" "}
                                <Text fz={14} span>
                                    Gọi đi
                                </Text>
                            </Text>
                            <Text fz={14}>
                                Số điện thoại:{" "}
                                <Text fz={14} span>
                                    0934072724
                                </Text>
                            </Text>
                            <Text fz={14}>
                                Trạng thái:{" "}
                                <Text fz={14} span>
                                    Trả lời
                                </Text>
                            </Text>
                            <Text fz={14}>
                                Thời gian đàm thoại:{" "}
                                <Text fz={14} span>
                                    12:00
                                </Text>
                            </Text>
                            <Flex fz={14} align={"center"} gap={10}>
                                Ghi âm:
                                <audio controls>
                                    <source src='horse.ogg' type='audio/ogg' />
                                    <source src='horse.mp3' type='audio/mpeg' />
                                    Your browser does not support the audio tag.
                                </audio>
                            </Flex>
                        </Flex>
                    </Flex>
                </ScrollArea>
            )}
        </Flex>
    );
};

export default CallHistoryItem;
