import { Flex, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import cdrApis from "../../lib/api/cdrApis";
import PageToolbar from "../../components/home/PageToolbar";
import HomeChart from "./components/homeChart";
import CdrTable from "./components/CdrTable";
import PanelCount from "./components/PanelCount";

const CdrReports = () => {
    const theme = useMantineTheme();
    const [timeSelected, setTimeSelected] = useState("day");
    const [loading, setLoading] = useState(false);

    const [cdrData, setCdrData] = useState([]);
    const [cdrLoading, setCdrLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");

    const handleClick = () => {
        getCdrData();
    };

    const getCdrData = async () => {
        setCdrLoading(true);
        setLoading(true);

        let startTime;

        switch (timeSelected) {
            case "day":
                startTime = moment(Date.now()).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).unix();
                break;

            case "week":
                startTime = moment(Date.now())
                    .subtract(1, "week")
                    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
                    .unix();
                break;

            case "mon":
                startTime = moment(Date.now())
                    .subtract(1, "month")
                    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
                    .unix();
                break;
        }

        const endTime = moment(Date.now()).set({ hour: 23, minute: 59, second: 59, millisecond: 99 }).unix();

        const data = await cdrApis.getAllCdrByTimeAndExtension({ startTime, endTime, page, searchValue });

        setCdrData(data.data);

        setCdrLoading(false);
        setLoading(false);
    };

    useEffect(() => {
        getCdrData();
    }, [page, searchValue, timeSelected]);

    console.log("cdrData", cdrData);

    return (
        <Flex direction='column' gap={30} px={20}>
            <Flex align='center' justify='space-between' mt={30}>
                <PageToolbar
                    handleClick={handleClick}
                    loading={loading}
                    timeSelected={timeSelected}
                    setTimeSelected={setTimeSelected}
                />
            </Flex>

            <Flex w='100%'>
                {cdrData.data?.length > 0 && <PanelCount loading={loading} cdrData={cdrData} />}
            </Flex>

            <Flex align='center' justify='space-between' gap={20} h={400}>
                <HomeChart loading={loading} cdrData={cdrData} />
            </Flex>

            <Flex>
                <CdrTable
                    cdrData={cdrData}
                    cdrLoading={cdrLoading}
                    loading={loading}
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
