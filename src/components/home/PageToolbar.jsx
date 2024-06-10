import { ActionIcon, Flex, Select, Text } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";

const PageToolbar = ({ handleClick, loading, timeSelected, setTimeSelected }) => {
    return (
        <>
            <Text fz={20}>Thống kê gọi</Text>

            <Flex align='center' gap={20}>
                <ActionIcon
                    loading={loading}
                    onClick={handleClick}
                    variant='filled'
                    color='indigo'
                    size={40}
                    aria-label='Settings'
                >
                    <IconRefresh style={{ width: "70%", height: "70%" }} stroke={1.5} />
                </ActionIcon>

                <Select
                    disabled={loading}
                    size='md'
                    placeholder='Pick value'
                    value={timeSelected}
                    onChange={setTimeSelected}
                    data={[
                        { value: "day", label: "Ngày" },
                        { value: "week", label: "Tuần" },
                        { value: "mon", label: "Tháng" }
                    ]}
                    defaultValue='React'
                    allowDeselect={false}
                />
            </Flex>
        </>
    );
};

export default PageToolbar;
