import { useLocation } from "react-router-dom";
import { Button, Flex, Text, Textarea, useMantineTheme } from "@mantine/core";

const InCallPage = () => {
    const location = useLocation();
    const theme = useMantineTheme();

    console.log("location", location);

    return (
        <Flex direction={"column"} px={20}>
            <Flex py={20}>
                <Text>Đang thực hiện cuộc gọi</Text>
            </Flex>

            <Flex
                bg={theme.colors.indigo[6]}
                py={14}
                align={"center"}
                justify={"space-around"}
                c='white'
                style={{
                    borderRadius: 6
                }}
            >
                <Text span>Gọi đi</Text>
                <Text span>/</Text>
                <Text span>0934072724</Text>
                <Text span>00:12</Text>
                <Button bg={theme.colors.red[7]}>Tắt máy</Button>
            </Flex>

            <Flex py={40} gap={10}>
                <Textarea
                    size='md'
                    radius='md'
                    placeholder='Nhập ghi chú cho cuộc gọi này...'
                    w={"50%"}
                    rows={4}
                />
                <Button color={theme.colors.indigo[6]}>Lưu ghi chú</Button>
            </Flex>
        </Flex>
    );
};

export default InCallPage;
