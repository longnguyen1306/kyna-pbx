import { Flex, Input, Loader, Pagination, Table, useMantineTheme } from "@mantine/core";

const data = [
    { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
    { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
    { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
    { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
    { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" }
];

const CdrTable = ({ cdrData, cdrLoading }) => {
    const theme = useMantineTheme();

    console.log("cdrData", cdrData);

    const rows = cdrData?.data?.map((item, index) => (
        <Table.Tr key={index}>
            <Table.Td>{item.cdr_id}</Table.Td>
            <Table.Td>{item.calldate}</Table.Td>
            <Table.Td>{item.symbol}</Table.Td>
            <Table.Td>{item.clid}</Table.Td>
            <Table.Td>{item.did}</Table.Td>
            <Table.Td>{item.source}</Table.Td>
            <Table.Td>{item.destination}</Table.Td>
            <Table.Td>{item.duration}</Table.Td>
            <Table.Td>{item.billsec}</Table.Td>
            <Table.Td>{item.disposition}</Table.Td>
            <Table.Td>{item.accountcode}</Table.Td>
            <Table.Td>{item.calltype}</Table.Td>
            <Table.Td>
                <Flex w={100}>{item.recfile}</Flex>
            </Table.Td>
            <Table.Td>{item.trunk}</Table.Td>
        </Table.Tr>
    ));

    return (
        <Flex bg='white' p={16} w='100%' h='100%' direction='column' gap={16}>
            <Flex align='center' justify='space-between'>
                <Input size='md' placeholder='Tìm theo số điện thoại...' w={340} />
                <Pagination total={10} color='indigo' />
            </Flex>

            <Table verticalSpacing='lg' highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>cdrId</Table.Th>
                        <Table.Th>callDate</Table.Th>
                        <Table.Th>callBy</Table.Th>
                        <Table.Th>clId</Table.Th>
                        <Table.Th>DID</Table.Th>
                        <Table.Th>source</Table.Th>
                        <Table.Th>destination</Table.Th>
                        <Table.Th>duration</Table.Th>
                        <Table.Th>billSec</Table.Th>
                        <Table.Th>disposition</Table.Th>
                        <Table.Th>accountCode</Table.Th>
                        <Table.Th>callType</Table.Th>
                        <Table.Th>recFile</Table.Th>
                        <Table.Th>trunk</Table.Th>
                    </Table.Tr>
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
                                    h='100%'
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
        </Flex>
    );
};

export default CdrTable;
