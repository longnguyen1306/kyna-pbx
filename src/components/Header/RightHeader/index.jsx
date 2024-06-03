import { Flex } from "@mantine/core";
import AccountInfo from "./AccountInfo";
import ServerPing from "./ServerPing";
import SipInfo from "./SipInfo";

const RightHeader = () => {
    return (
        <Flex align={"center"} gap={20}>
            <SipInfo />

            <ServerPing />

            <AccountInfo />
        </Flex>
    );
};

export default RightHeader;
