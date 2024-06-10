import { ActionIcon, Flex, Select, Text, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import PageToolbar from "../components/home/PageToolbar";
import HomeChart from "../components/home/homeChart";
import CdrTable from "../components/home/CdrTable";
import cdrApis from "../lib/api/cdrApis";
import moment from "moment";

const HomePage = () => {
    const theme = useMantineTheme();
    const [timeSelected, setTimeSelected] = useState("day");
    const [loading, setLoading] = useState(false);

    const [cdrData, setCdrData] = useState([]);
    const [cdrLoading, setCdrLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    const getCdrData = async () => {
        setCdrLoading(true);

        const startTime = moment(Date.now()).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).unix();
        const endTime = moment(Date.now()).set({ hour: 23, minute: 59, second: 59, millisecond: 99 }).unix();

        const data = await cdrApis.getAllCdrByTimeAndExtension({ startTime, endTime });

        if (data.code === "success") {
            setCdrData(data.data);

            setCdrLoading(false);
        }
    };

    useEffect(() => {
        getCdrData();
    }, []);

    console.log("cdrData", cdrData);

    return (
        <Flex direction='column' gap={16} px={20}>
            <Flex align='center' justify='space-between' my={20}>
                <PageToolbar
                    handleClick={handleClick}
                    loading={loading}
                    timeSelected={timeSelected}
                    setTimeSelected={setTimeSelected}
                />
            </Flex>

            <Flex align='center' justify='space-between' gap={20} h={400}>
                <HomeChart />
            </Flex>

            <Flex>
                <CdrTable cdrData={cdrData} cdrLoading={cdrLoading} />
            </Flex>
        </Flex>
    );
};

export default HomePage;
