import { Flex, useMantineTheme } from "@mantine/core";

const HomeChart = () => {
    const theme = useMantineTheme();

    return (
        <>
            <Flex
                bg='white'
                w='100%'
                h='100%'
                p={16}
                style={{
                    borderRadius: theme.radius.md,
                    boxShadow: theme.shadows.xs
                }}
            >
                ss
            </Flex>

            <Flex w='100%' justify='space-between' gap={20} h='100%'>
                <Flex
                    bg='white'
                    w='100%'
                    h='100%'
                    p={16}
                    style={{
                        borderRadius: theme.radius.md,
                        boxShadow: theme.shadows.xs
                    }}
                >
                    ss
                </Flex>
                <Flex
                    bg='white'
                    w='100%'
                    h='100%'
                    p={16}
                    style={{
                        borderRadius: theme.radius.md,
                        boxShadow: theme.shadows.xs
                    }}
                >
                    ss
                </Flex>
            </Flex>
        </>
    );
};

export default HomeChart;
