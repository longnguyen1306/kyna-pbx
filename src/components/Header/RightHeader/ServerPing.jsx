import { Flex, Text, useMantineTheme } from "@mantine/core";
import Ping from "ping.js";
import { useEffect, useState } from "react";

const ServerPing = () => {
    const [pingTime, setPingTime] = useState(0);
    const p = new Ping();
    const theme = useMantineTheme();

    useEffect(() => {
        const pingID = setInterval(() => {
            p.ping("https://sip.kynaenglish.vn", (err, data) => {
                setPingTime(data);
                if (err) {
                    console.error(err);
                }
            });
        }, 1000);

        return () => clearInterval(pingID);
    }, []);

    return (
        <Flex fz={11} align='center' gap={8}>
            SIP_SRV:
            <Text fz={13} c={pingTime <= 70 ? theme.colors.green[6] : theme.colors.red[6]}>
                {pingTime} ms
            </Text>
        </Flex>
    );
};

export default ServerPing;
