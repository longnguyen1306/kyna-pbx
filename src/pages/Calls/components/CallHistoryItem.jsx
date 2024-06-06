import { ActionIcon, Flex, ScrollArea, Text, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { useHover } from "@mantine/hooks";
import { IconPhoneOutgoing } from "@tabler/icons-react";
import moment from "moment";
import CallDetail from "./CallDetail";
import CallNoteList from "./CallNoteList";
import BtnAddNote from "./BtnAddNote";
import cdrApis from "../../../lib/api/cdrApis";

const CallHistoryItem = ({ item, handleClickCall }) => {
    const theme = useMantineTheme();
    const [openNoteHistory, setOpenHistory] = useState(false);
    const { hovered, ref } = useHover();
    const [callHistory, setCallHistory] = useState(null);
    const [loading, setLoading] = useState(false);

    const getCdrByPhoneNumber = async () => {
        setLoading(true);

        const res = await cdrApis.getCdrsByPhone(item?.phoneNumber);

        setCallHistory(res.data);

        setLoading(false);
    };

    useEffect(() => {
        if (openNoteHistory) {
            getCdrByPhoneNumber();
        }
    }, [openNoteHistory]);

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
                            {item.phoneNumber} / {item.name}
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
                                {item?._id}
                            </Text>

                            <Text
                                c={theme.colors.gray[5]}
                                fz={13}
                                pr={10}
                                mr={10}
                                style={{
                                    borderRight: `1px solid ${theme.colors.gray[5]}`
                                }}
                            >
                                {moment(item?.createdAt).format("DD/MM/YYYY, HH:mm:ss")}
                            </Text>

                            <Text
                                c={theme.colors.gray[5]}
                                fz={13}
                                pr={10}
                                mr={10}
                                style={{
                                    borderRight: `1px solid ${theme.colors.gray[5]}`
                                }}
                            >
                                {item?.agent?.email}
                            </Text>

                            <Text c={theme.colors.gray[5]} fz={13} pr={10} mr={10}>
                                {item?.accountCode}
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>

                <Flex align={"center"} gap={10}>
                    <BtnAddNote item={item} />

                    <ActionIcon
                        onClick={() => handleClickCall(item.phoneNumber)}
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
                </Flex>
            </Flex>

            {openNoteHistory && (
                <ScrollArea
                    scrollbarSize={8}
                    scrollbars='y'
                    type='auto'
                    bg='white'
                    style={{
                        height: 700,
                        borderRightColor: theme.colors.gray[1],
                        borderRightStyle: "solid"
                    }}
                >
                    <Flex justify='space-between' gap={20}>
                        <ScrollArea
                            scrollbarSize={8}
                            scrollbars='y'
                            type='auto'
                            bg='white'
                            style={{
                                width: "100%",
                                height: 700,
                                margin: "0 10px"
                            }}
                        >
                            <Flex direction='column'>
                                {item?.noteList?.length > 0
                                    ? item?.noteList?.map((itemCall, index) => (
                                          <CallNoteList key={index} item={itemCall} call={item} />
                                      ))
                                    : "null"}
                            </Flex>
                        </ScrollArea>

                        <ScrollArea
                            scrollbarSize={8}
                            scrollbars='y'
                            type='auto'
                            bg='white'
                            style={{
                                width: "100%",
                                height: 700,
                                margin: "0 10px"
                            }}
                        >
                            <Flex direction='column'>
                                {loading ? (
                                    <>Loading...</>
                                ) : (
                                    <>
                                        {callHistory?.length > 0
                                            ? callHistory?.map((itemCall, index) => (
                                                  <CallDetail key={index} item={itemCall} call={item} />
                                              ))
                                            : "null"}
                                    </>
                                )}
                            </Flex>
                        </ScrollArea>
                    </Flex>
                </ScrollArea>
            )}
        </Flex>
    );
};

export default CallHistoryItem;
