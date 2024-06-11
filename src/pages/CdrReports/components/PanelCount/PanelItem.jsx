import { Flex, Loader, Text, useMantineTheme } from "@mantine/core";

const PanelItem = ({ icon, label, countNumber, color, loading }) => {
    const theme = useMantineTheme();

    return (
        <Flex
            bg='white'
            p={20}
            w='100%'
            style={{
                borderRadius: theme.radius.md
            }}
            align='center'
            justify='center'
            h={120}
            gap={10}
        >
            <Flex c={color}>{icon}</Flex>
            <Flex align='center' justify='center' direction='column'>
                <Text fz={20} c={color}>
                    {loading ? <Loader color={color} type='dots' /> : <>{countNumber?.toLocaleString()}</>}
                </Text>
                <Text fz={16} c='dimmed'>
                    {label}
                </Text>
            </Flex>
        </Flex>
    );
};

export default PanelItem;
