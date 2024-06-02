import { Flex, Tabs, useMantineTheme, rem, Input, ActionIcon, ScrollArea, Radio, Group } from "@mantine/core";
import { IconHistory, IconPhone, IconArrowLeft } from "@tabler/icons-react";
import { useHover } from "@mantine/hooks";
import styles from "../../assets/styles/Calls.module.scss";
import CallHistoryItem from "./components/CallHistoryItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const tabData = [{ value: "callHistory", label: "Lịch sử cuộc gọi" }];

const CallPage = () => {
    const theme = useMantineTheme();
    const { hovered, ref } = useHover();
    const [value, setValue] = useState("all");
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigate = useNavigate();

    const handleMakeCall = () => {
        if (!phoneNumber) {
            return toast.error("Nhập một số điện thoại hợp lệ");
        }

        return navigate("/in-call", {
            state: {
                callType: "callOut",
                phoneNumber
            }
        });
    };

    return (
        <Flex>
            <Tabs
                activateTabWithKeyboard={false}
                color='indigo'
                orientation='vertical'
                defaultValue='callHistory'
                bg={theme.colors.gray[1]}
                w={"100%"}
                classNames={{
                    root: styles.root,
                    tab: styles.tab,
                    tabLabel: styles.label,
                    panel: styles.panel
                }}
            >
                <Tabs.List>
                    <Flex direction={"column"} justify={"space-between"} h={"100%"}>
                        <Flex direction={"column"}>
                            {tabData?.map((item, index) => (
                                <Tabs.Tab ref={ref} value={item.value} key={index}>
                                    <IconHistory />
                                    {item.label}
                                </Tabs.Tab>
                            ))}
                        </Flex>

                        <Flex
                            bg={"white"}
                            h={"65%"}
                            direction={"column"}
                            align={"center"}
                            justify={"space-between"}
                            pb={100}
                        >
                            <Flex w={"100%"} py={20}>
                                <Input
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    size='md'
                                    placeholder='Nhập số cần gọi...'
                                    w={"100%"}
                                />
                            </Flex>

                            <Flex></Flex>

                            <Flex align={"center"} justify={"space-between"} w={"100%"}>
                                <Flex></Flex>
                                <Flex>
                                    <ActionIcon
                                        onClick={handleMakeCall}
                                        data-tooltip-id='app-tooltip'
                                        data-tooltip-content='Tạo cuộc gọi đi!'
                                        variant='filled'
                                        color='indigo'
                                        radius='xl'
                                        aria-label='Settings'
                                        w={60}
                                        h={60}
                                    >
                                        <IconPhone style={{ width: "60%", height: "60%" }} stroke={1.5} />
                                    </ActionIcon>
                                </Flex>
                                <Flex></Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Tabs.List>

                {tabData?.map((item, index) => (
                    <Tabs.Panel value={item.value} key={index}>
                        <Flex h={100} direction={"column"} justify={"space-between"}>
                            <Flex align={"center"} py={10} justify={"space-between"}>
                                <Flex align={"center"} gap={4}>
                                    <IconArrowLeft size={18} /> <span>Lịch sử cuộc gọi hôm nay</span>
                                </Flex>

                                <Flex align={"center"} gap={4}>
                                    <span>250</span>
                                    <span>Cuộc gọi</span>
                                </Flex>
                            </Flex>

                            <Flex align={"center"} pb={20} justify={"space-between"}>
                                <Flex>
                                    <Radio.Group name='favoriteFramework' value={value} onChange={setValue}>
                                        <Group mt='xs'>
                                            <Radio value='all' label='All' />
                                            <Radio value='svelte' label='Gọi đi không trả lời' />
                                            <Radio value='ng' label='Gọi đi trả lời' />
                                            <Radio value='vue' label='Lỗi' />
                                        </Group>
                                    </Radio.Group>
                                </Flex>

                                <Flex>
                                    <Input size='sm' w={300} placeholder='Tìm số điện thoại đã gọi...' />
                                </Flex>
                            </Flex>
                        </Flex>

                        <ScrollArea
                            // offsetScrollbars
                            scrollbarSize={8}
                            scrollbars='y'
                            type='auto'
                            bg={"white"}
                            style={{
                                height: `calc(100vh - 160px)`,
                                borderRightColor: theme.colors.gray[1],
                                borderRightStyle: "solid"
                            }}
                        >
                            <Flex direction={"column"}>
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                                <CallHistoryItem />
                            </Flex>
                        </ScrollArea>
                    </Tabs.Panel>
                ))}
            </Tabs>
        </Flex>
    );
};

export default CallPage;
