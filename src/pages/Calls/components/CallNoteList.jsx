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
                        {moment(item?.calldate).utcOffset(14).format("DD/MM/YYYY, HH:mm:ss")}
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
                        long.nguyen@kynaforkids.vn
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
                        Cùng với việc xin lỗi các khách hàng, đối tác vì sự cố gián đoạn dịch vụ không mong
                        muốn, đại diện Vietnam Post thông tin thêm: Hiện tại, doanh nghiệp đang làm việc với
                        các cơ quan chức năng và phối hợp với các đối tác là những tập đoàn CNTT hàng đầu Việt
                        Nam để nỗ lực xử lý, khắc phục sự cố trong thời gian sớm nhất, đảm bảo tối đa quyền
                        lợi khách hàng.
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default CallNoteList;
