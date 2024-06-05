import { Flex, Group, Input, Loader, Pagination, Radio, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";

const PageToolBar = ({ cdrData, loading, activePage, setPage }) => {
    return (
        <Flex direction='column' justify='space-between' h={100}>
            <Flex h={"50%"} align={"center"} justify='space-between'>
                <Flex align={"center"} gap={10}>
                    <IconArrowLeft size={18} />
                    <Text>Lịch sử cuộc gọi</Text>
                </Flex>

                <Flex align={"center"} gap={10}>
                    <Text>
                        {loading ? <Loader color='indigo' type='dots' size={22} /> : cdrData?.totalDocs}
                    </Text>
                    <Text>Cuộc gọi</Text>
                </Flex>
            </Flex>

            <Flex h={"50%"} align={"center"} justify={"space-between"}>
                <Flex>
                    <Radio.Group
                        name='favoriteFramework'
                        // value={checkBoxFilterData}
                        // onChange={setCheckBoxFilterData}
                    >
                        <Group mt='xs'>
                            <Radio
                                color='indigo'
                                value='all'
                                label='All'
                                styles={{
                                    label: {
                                        cursor: "pointer",
                                        textTransform: "uppercase"
                                    }
                                }}
                            />
                        </Group>
                    </Radio.Group>
                </Flex>

                <Flex align='center' gap={30}>
                    <Input
                        leftSection={loading ? <Loader color='indigo' type='dots' size={22} /> : null}
                        disabled={loading}
                        size='md'
                        radius='md'
                        placeholder='Tìm số điện thoại...'
                        w={300}
                    />

                    <Flex>
                        <Pagination
                            total={cdrData?.totalPages}
                            value={activePage}
                            onChange={setPage}
                            color='indigo'
                        />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default PageToolBar;
