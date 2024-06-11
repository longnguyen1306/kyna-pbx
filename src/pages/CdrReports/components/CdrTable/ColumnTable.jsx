import { Table, useMantineTheme } from "@mantine/core";

const ColumnTable = () => {
    const theme = useMantineTheme();

    return (
        <Table.Tr
            style={{
                textAlign: "center",
                color: theme.colors.gray[6],
                display: "inline-flex"
            }}
        >
            <Table.Th
                style={{
                    textAlign: "center",
                    color: theme.colors.gray[6],
                    width: 100
                }}
            >
                cdrId
            </Table.Th>
            <Table.Th
                style={{
                    textAlign: "center",
                    color: theme.colors.gray[6],
                    width: 180
                }}
            >
                callDate
            </Table.Th>
            <Table.Th
                style={{
                    textAlign: "center",
                    color: theme.colors.gray[6],
                    width: 240
                }}
            >
                clId
            </Table.Th>

            <Table.Th
                style={{
                    textAlign: "center",
                    color: theme.colors.gray[6],
                    width: 180
                }}
            >
                destination
            </Table.Th>

            <Table.Th
                style={{
                    textAlign: "center",
                    color: theme.colors.gray[6],
                    width: 180
                }}
            >
                disposition
            </Table.Th>

            <Table.Th
                style={{
                    textAlign: "center",
                    color: theme.colors.gray[6],
                    width: 80
                }}
            >
                duration
            </Table.Th>
            <Table.Th
                style={{
                    textAlign: "center",
                    color: theme.colors.gray[6],
                    width: 80
                }}
            >
                billSec
            </Table.Th>

            <Table.Th
                style={{
                    textAlign: "center",
                    color: theme.colors.gray[6],
                    width: 120
                }}
            >
                callType
            </Table.Th>
            <Table.Th
                style={{
                    textAlign: "center",
                    color: theme.colors.gray[6],
                    width: 160
                }}
            >
                recFile
            </Table.Th>

            <Table.Th
                style={{
                    textAlign: "center",
                    color: theme.colors.gray[6],
                    width: 120
                }}
            >
                accountCode
            </Table.Th>

            <Table.Th
                style={{
                    textAlign: "center",
                    color: theme.colors.gray[6],
                    width: 180
                }}
            >
                source
            </Table.Th>

            <Table.Th
                style={{
                    textAlign: "center",
                    color: theme.colors.gray[6],
                    width: 120
                }}
            >
                trunk
            </Table.Th>

            <Table.Th
                style={{
                    textAlign: "center",
                    color: theme.colors.gray[6],
                    width: 180
                }}
            >
                DID
            </Table.Th>
        </Table.Tr>
    );
};

export default ColumnTable;
