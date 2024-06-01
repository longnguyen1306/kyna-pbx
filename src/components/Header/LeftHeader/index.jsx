import { Flex, NavLink } from "@mantine/core";
import { Link } from "react-router-dom";

const LeftHeader = () => {
    return (
        <Flex>
            <NavLink
                href='/'
                label='DVE PBX'
                component={Link}
                styles={{
                    label: {
                        fontSize: 20
                    }
                }}
            />
        </Flex>
    );
};

export default LeftHeader;
