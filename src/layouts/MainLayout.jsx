import { Outlet } from "react-router-dom";
import { Box, Flex, ScrollArea, useMantineTheme } from "@mantine/core";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
    const theme = useMantineTheme();

    return (
        <Box c={theme.colors.gray[6]} bg={theme.colors.gray[1]}>
            <Flex
                h={60}
                align={"center"}
                bg={"white"}
                px={20}
                style={{
                    borderBottomColor: theme.colors.gray[3],
                    borderBottomStyle: "solid"
                }}
            >
                <Header />
            </Flex>

            <Flex>
                <ScrollArea
                    // offsetScrollbars
                    scrollbarSize={8}
                    scrollbars='y'
                    type='auto'
                    w={96}
                    bg={"white"}
                    style={{
                        height: `calc(100vh - 60px)`,
                        borderRightColor: theme.colors.gray[1],
                        borderRightStyle: "solid"
                    }}
                >
                    <Sidebar />
                </ScrollArea>

                <ScrollArea
                    scrollbarSize={8}
                    scrollbars='y'
                    type='auto'
                    w={"100%"}
                    style={{
                        height: `calc(100vh - 60px)`
                    }}
                >
                    <Outlet />
                </ScrollArea>
            </Flex>
        </Box>
    );
};

export default MainLayout;
