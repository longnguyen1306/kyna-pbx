import { Flex } from "@mantine/core";
import LeftHeader from "./LeftHeader";
import RightHeader from "./RightHeader";

const Header = () => {
    return (
        <Flex align={"center"} justify={"space-between"} w={"100%"}>
            <LeftHeader />

            <RightHeader />
        </Flex>
    );
};

export default Header;
