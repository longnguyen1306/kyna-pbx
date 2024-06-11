import { Flex, Loader, useMantineTheme } from "@mantine/core";
import Chart10Day from "./Chart10Day";
import OutboundChart from "./OutboundChart";
import InboundChart from "./InboundChart";

const HomeChart = ({ loading, cdrData }) => {
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
                {loading ? (
                    <Flex h='100%' w='100%' align='center' justify='center'>
                        <Loader color='indigo' size='sm' type='bars' />
                    </Flex>
                ) : (
                    <Chart10Day />
                )}
            </Flex>

            <Flex w='100%' justify='space-between' gap={20} h='100%'>
                <Flex
                    bg='white'
                    w='100%'
                    h='100%'
                    style={{
                        borderRadius: theme.radius.md,
                        boxShadow: theme.shadows.xs
                    }}
                >
                    {loading ? (
                        <Flex h='100%' w='100%' align='center' justify='center'>
                            <Loader color='indigo' size='sm' type='bars' />
                        </Flex>
                    ) : (
                        <OutboundChart cdrData={cdrData} />
                    )}
                </Flex>
                <Flex
                    bg='white'
                    w='100%'
                    h='100%'
                    style={{
                        borderRadius: theme.radius.md,
                        boxShadow: theme.shadows.xs
                    }}
                >
                    {loading ? (
                        <Flex h='100%' w='100%' align='center' justify='center'>
                            <Loader color='indigo' size='sm' type='bars' />
                        </Flex>
                    ) : (
                        <InboundChart cdrData={cdrData} />
                    )}
                </Flex>
            </Flex>
        </>
    );
};

export default HomeChart;
