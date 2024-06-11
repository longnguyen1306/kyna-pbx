import { Flex, Input, Loader, Pagination, ScrollArea, Table, useMantineTheme } from "@mantine/core";
import RowItem from "./RowItem";
import ColumnTable from "./ColumnTable";

const CdrTable = ({ cdrData, cdrLoading, page, setPage, searchValue, setSearchValue }) => {
    const theme = useMantineTheme();

    const rows = cdrData?.data?.map((item, index) => <RowItem key={index} item={item} />);

    return (
        <Flex bg='white' p={16} flex={1} w='100%' direction='column' gap={16}>
            <Flex align='center' justify='space-between'>
                <Input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    size='md'
                    placeholder='Tìm theo số điện thoại...'
                    w={340}
                />
                <Pagination total={cdrData?.totalPages} value={page} onChange={setPage} color='indigo' />
            </Flex>

            <ScrollArea w={"100%"} scrollbars='x'>
                <Table
                    verticalSpacing='md'
                    // horizontalSpacing='md'
                    highlightOnHover
                    layout='fixed'
                    styles={{
                        table: {
                            overflow: "auto"
                        }
                    }}
                >
                    <Table.Thead>
                        <ColumnTable />
                    </Table.Thead>

                    <Table.Tbody>
                        {cdrLoading ? (
                            <Table.Tr>
                                <Table.Td colSpan={15} h={300}>
                                    <Flex
                                        align='center'
                                        justify='center'
                                        bg={theme.colors.gray[0]}
                                        h='100%'
                                        w='100%'
                                    >
                                        <Loader color='indigo' size='md' type='bars' />;
                                    </Flex>
                                </Table.Td>
                            </Table.Tr>
                        ) : (
                            rows
                        )}
                    </Table.Tbody>
                </Table>
            </ScrollArea>
        </Flex>
    );
};

export default CdrTable;
