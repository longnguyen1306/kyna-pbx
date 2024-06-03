import { Flex, Text, useMantineTheme } from "@mantine/core";
import { useSelector } from "react-redux";

const SipInfo = () => {
    const { sipStatus, wsStatus, sipNumber } = useSelector((state) => state.jsSip);
    const { user } = useSelector((state) => state.auth);

    const theme = useMantineTheme();

    return (
        <Flex align='center' gap={14}>
            <Flex fz={12} align='center' gap={4}>
                Email:
                <Text fz={13} c={theme.colors.indigo[7]}>
                    {user?.user?.email}
                </Text>
            </Flex>

            <Flex fz={11} align='center' gap={4}>
                WS_STATUS:
                <Text
                    fz={13}
                    c={theme.colors.indigo[7]}
                    style={{
                        textTransform: "uppercase"
                    }}
                >
                    {wsStatus}
                </Text>
            </Flex>

            <Flex fz={11} align='center' gap={4}>
                SIP_STATUS:
                <Text
                    fz={13}
                    c={theme.colors.indigo[7]}
                    style={{
                        textTransform: "uppercase"
                    }}
                >
                    {sipStatus}
                </Text>
            </Flex>

            <Flex fz={11} align='center' gap={4}>
                SIP_NUMBER:
                <Text fz={13} c={user?.user?.sipNumber ? theme.colors.indigo[7] : theme.colors.red[7]}>
                    {user?.user?.sipNumber}
                </Text>
            </Flex>
        </Flex>
    );
};

export default SipInfo;
