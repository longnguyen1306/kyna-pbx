import Chart from "react-apexcharts";
import { Flex, Text } from "@mantine/core";

const Chart10Day = () => {
    return (
        <Flex align='center' w='100%' justify='center' direction='column'>
            <Text>10 ngày gần nhất</Text>
            <Chart
                options={{
                    chart: {
                        type: "bar",
                        height: 350,
                        width: "100%",
                        animations: {
                            enabled: true,
                            easing: "easeinout",
                            speed: 800,
                            animateGradually: {
                                enabled: true,
                                delay: 150
                            },
                            dynamicAnimation: {
                                enabled: true,
                                speed: 350
                            }
                        }
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            // columnWidth: "55%",
                            endingShape: "rounded"
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        show: true,
                        width: 2,
                        colors: ["transparent"]
                    },
                    xaxis: {
                        categories: [
                            "02/06",
                            "03/06",
                            "04/06",
                            "05/06",
                            "06/06",
                            "07/06",
                            "08/06",
                            "09/06",
                            "10/06",
                            "11/06"
                        ]
                    },
                    legend: {
                        show: false
                    },
                    fill: {
                        opacity: 1
                    }
                }}
                series={[
                    {
                        name: "Net Profit",
                        data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 12]
                    },
                    {
                        name: "Revenue",
                        data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 55]
                    },
                    {
                        name: "Free Cash Flow",
                        data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 12]
                    }
                ]}
                type='bar'
                height={340}
                width={740}
            />
        </Flex>
    );
};

export default Chart10Day;
