import { Flex } from "@mantine/core";
import PanelItem from "./PanelItem";
import {
    IconPhone,
    IconPhoneIncoming,
    IconPhoneOff,
    IconPhoneOutgoing,
    IconUsers
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

const PanelCount = ({ loading, cdrData }) => {
    const [outGoingCount, setOutGoingCount] = useState(0);
    const [incomingCount, setIncomingCount] = useState(0);
    const [missCallByAgentCount, setMissCallByAgentCount] = useState(0);

    useEffect(() => {
        const outgoingCall = cdrData?.data?.filter((c) => c?.calltype === "3");
        const incomingCall = cdrData?.data?.filter((c) => c?.calltype === "2");

        setOutGoingCount(outgoingCall?.length);

        setIncomingCount(incomingCall?.length);

        setMissCallByAgentCount(() => {
            return incomingCall?.filter((ic) => ic.disposition === "NO ANSWER").length;
        });
    }, [cdrData]);

    return (
        <Flex gap={30} align='center' justify='space-between' w='100%'>
            <PanelItem
                color='#4C6EF5'
                icon={<IconUsers size={32} />}
                label={"Agents"}
                countNumber={"1"}
                loading={loading}
            />
            <PanelItem
                color='#40C057'
                icon={<IconPhone size={32} />}
                label={"Tổng cuộc gọi"}
                countNumber={cdrData?.totalItems}
                loading={loading}
            />
            <PanelItem
                color='#7950F2'
                icon={<IconPhoneOutgoing size={32} />}
                label={"Gọi đi"}
                countNumber={outGoingCount}
                loading={loading}
            />
            <PanelItem
                color='#FD7E14'
                icon={<IconPhoneIncoming size={32} />}
                label={"Gọi đến"}
                countNumber={incomingCount}
                loading={loading}
            />
            <PanelItem
                color='#FA5252'
                icon={<IconPhoneOff size={32} />}
                label={"Nhỡ từ agents"}
                countNumber={missCallByAgentCount}
                loading={loading}
            />
        </Flex>
    );
};

export default PanelCount;
