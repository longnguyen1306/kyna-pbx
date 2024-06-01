import SidebarItem from "./SidebarItem";
import { Flex } from "@mantine/core";
import { IconChartLine, IconHeadphones, IconPhone } from "@tabler/icons-react";

const Sidebar = () => {
    return (
        <Flex direction={"column"}>
            <SidebarItem icon={<IconPhone size={28} />} label='Calls' to={"/calls"} />
            <SidebarItem icon={<IconChartLine size={28} />} label='Reports' to={"/cdr-reports"} />
            <SidebarItem icon={<IconHeadphones size={28} />} label='History' to={"/call-history"} />
        </Flex>
    );
};

export default Sidebar;
