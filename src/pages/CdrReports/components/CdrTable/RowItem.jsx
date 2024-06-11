import { Button, Flex, Modal, Table, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ReactAudioPlayer from "react-audio-player";
import { fancyTimeFormat } from "../../../../lib/utils/dateTimeFunction";
import { handleRecFile } from "../../../../lib/utils/fileFunctions";

const RowItem = ({ item }) => {
    const theme = useMantineTheme();
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <Table.Tr
            style={{
                display: "inline-flex",
                fontSize: 14
            }}
        >
            <Table.Td>
                <Flex w={80} align='center' justify='center' h='100%'>
                    {item.cdr_id}
                </Flex>
            </Table.Td>

            <Table.Td>
                <Flex w={160} align='center' justify='center' h='100%' style={{ wordWrap: "break-word" }}>
                    {item.calldate}
                </Flex>
            </Table.Td>

            <Table.Td>
                <Flex
                    w={220}
                    align='center'
                    justify='center'
                    h='100%'
                    style={{ wordWrap: "break-word", textAlign: "center" }}
                >
                    {item.clid}
                </Flex>
            </Table.Td>

            <Table.Td>
                <Flex w={160} align='center' justify='center' h='100%' style={{ wordWrap: "break-word" }}>
                    {item.destination}
                </Flex>
            </Table.Td>

            <Table.Td>
                <Flex
                    w={160}
                    align='center'
                    c={
                        item.disposition === "ANSWERED"
                            ? theme.colors.green[6]
                            : item.disposition === "NO ANSWER"
                              ? theme.colors.indigo[6]
                              : theme.colors.red[6]
                    }
                    justify='center'
                    h='100%'
                    style={{ wordWrap: "break-word" }}
                >
                    {item.disposition}
                </Flex>
            </Table.Td>

            <Table.Td>
                <Flex w={60} align='center' justify='center' h='100%' style={{ wordWrap: "break-word" }}>
                    {fancyTimeFormat(item.duration)}
                </Flex>
            </Table.Td>
            <Table.Td>
                <Flex w={60} align='center' justify='center' h='100%' style={{ wordWrap: "break-word" }}>
                    {fancyTimeFormat(item.billsec)}
                </Flex>
            </Table.Td>

            <Table.Td>
                <Flex
                    w={100}
                    align='center'
                    c={
                        item.calltype === "3"
                            ? theme.colors.green[6]
                            : item.calltype === "2"
                              ? theme.colors.indigo[6]
                              : theme.colors.red[6]
                    }
                    justify='center'
                    h='100%'
                    style={{ wordWrap: "break-word" }}
                >
                    {item.calltype === "3"
                        ? "OUTGOING"
                        : item.calltype === "2"
                          ? "INCOMING"
                          : "INTERNAL/FAILED"}
                </Flex>
            </Table.Td>
            <Table.Td>
                <Flex w={140} align='center' justify='center' h='100%' style={{ wordWrap: "break-word" }}>
                    {item.recfile ? (
                        <Flex align='center' justify='center' w='100%'>
                            <Modal opened={opened} onClose={close} withCloseButton={false}>
                                <Flex w='100%' align='center' justify='center'>
                                    <ReactAudioPlayer src={handleRecFile(item.recfile)} controls autoPlay />
                                </Flex>
                            </Modal>

                            <Button onClick={open} color='indigo' size='xs'>
                                Nghe ghi âm
                            </Button>
                        </Flex>
                    ) : (
                        "null"
                    )}
                </Flex>
            </Table.Td>

            <Table.Td>
                <Flex w={100} align='center' justify='center' h='100%' style={{ wordWrap: "break-word" }}>
                    {item.accountcode ? item.accountcode : "/"}
                </Flex>
            </Table.Td>

            <Table.Td>
                <Flex w={160} align='center' justify='center' h='100%' style={{ wordWrap: "break-word" }}>
                    {item.source}
                </Flex>
            </Table.Td>

            <Table.Td>
                <Flex w={100} align='center' justify='center' h='100%' style={{ wordWrap: "break-word" }}>
                    {item.trunk}
                </Flex>
            </Table.Td>

            <Table.Td>
                <Flex w={160} align='center' justify='center' h='100%' style={{ wordWrap: "break-word" }}>
                    {item.did}
                </Flex>
            </Table.Td>
        </Table.Tr>
    );
};

export default RowItem;
