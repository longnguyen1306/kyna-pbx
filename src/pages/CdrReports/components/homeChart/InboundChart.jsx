import Chart from "react-apexcharts";
import { Flex, Text } from "@mantine/core";

const InboundChart = ({ cdrData }) => {
    const chartData = () => {
        const outgoingCall = cdrData?.data?.filter((c) => c?.calltype === "2");
        const answered = outgoingCall?.filter((cl) => cl.disposition === "ANSWERED").length;
        const noAnswered = outgoingCall?.filter((cll) => cll.disposition === "NO ANSWER").length;
        const failed = outgoingCall?.filter(
            (cll) => cll.disposition !== "NO ANSWER" || cll.disposition === "ANSWERED"
        ).length;

        return [+answered, +noAnswered, +failed];
    };

    return (
        <Flex align='center' justify='space-around' direction='column'>
            <Text>Thống kê gọi vào</Text>
            <Chart
                options={{
                    chart: {
                        width: 380,
                        type: "pie"
                    },
                    legend: {
                        position: "bottom"
                    },
                    labels: ["ANSWERED", "NO ANSWER", "FAILED"],
                    colors: ["#40C057", "#FFA94D", "#FA5252"],
                    responsive: [
                        {
                            breakpoint: 480,
                            options: {
                                chart: {
                                    width: 200
                                },
                                legend: {
                                    position: "bottom"
                                }
                            }
                        }
                    ]
                }}
                series={chartData()}
                type='pie'
                width={380}
            />
        </Flex>
    );
};

export default InboundChart;
