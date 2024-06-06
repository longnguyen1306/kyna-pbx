import { Flex, Text, useMantineTheme } from "@mantine/core";
import moment from "moment/moment";

const CallNoteList = ({ item }) => {
    const theme = useMantineTheme();

    return (
        <Flex
            px={30}
            style={{
                borderBottomColor: theme.colors.gray[2],
                borderBottomStyle: "solid"
            }}
        >
            <Flex py={30} direction='column' gap={4}>
                <Flex fz={14} gap={4}>
                    Ngày tạo:
                    <Text
                        fz={14}
                        span
                        style={{
                            fontStyle: "italic"
                        }}
                    >
                        {moment(item?.date).format("DD/MM/YYYY, HH:mm:ss")}
                    </Text>
                </Flex>

                <Flex fz={14} gap={4}>
                    Người tạo:
                    <Text
                        fz={14}
                        span
                        style={{
                            fontStyle: "italic"
                        }}
                    >
                        {item?.createdBy}
                    </Text>
                </Flex>

                <Flex fz={14} direction='column'>
                    Nội dung ghi chú:
                    <Text
                        fz={14}
                        c={theme.colors.gray[5]}
                        span
                        px={30}
                        py={10}
                        style={{
                            fontStyle: "italic"
                        }}
                    >
                        {item?.note}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default CallNoteList;
