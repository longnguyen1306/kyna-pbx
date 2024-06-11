import { Flex, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import cdrApis from "../../lib/api/cdrApis";
import PageToolbar from "../../components/home/PageToolbar";
import HomeChart from "../../components/home/homeChart";
import CdrTable from "./components/CdrTable";

const CdrReports = () => {
    const theme = useMantineTheme();
    const [timeSelected, setTimeSelected] = useState("day");
    const [loading, setLoading] = useState(false);

    const [cdrData, setCdrData] = useState([]);
    const [cdrLoading, setCdrLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");

    const handleClick = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    const getCdrData = async () => {
        setCdrLoading(true);

        const startTime = moment(Date.now())
            .subtract(1, "month")
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .unix();
        const endTime = moment(Date.now()).set({ hour: 23, minute: 59, second: 59, millisecond: 99 }).unix();

        const data = await cdrApis.getAllCdrByTimeAndExtension({ startTime, endTime, page, searchValue });

        if (data.code === "success") {
            setCdrData(data.data);

            setCdrLoading(false);
        }
    };

    useEffect(() => {
        getCdrData();
    }, [page, searchValue]);

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
                <CdrTable
                    cdrData={cdrData}
                    cdrLoading={cdrLoading}
                    setPage={setPage}
                    page={page}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
            </Flex>
        </Flex>
    );
};

export default CdrReports;
