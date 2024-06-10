import { ActionIcon, Button, Flex, Group, Modal, Textarea, TextInput, useMantineTheme } from "@mantine/core";
import { IconNote } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { toast } from "react-toastify";
import callNoteApis from "../../../lib/api/callNoteApis";
import callHistoryApis from "../../../lib/api/callHistoryApis";

const BtnAddNote = ({ item, getCdrData }) => {
    const theme = useMantineTheme();
    const [loading, setLoading] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            name: item?.name,
            note: ""
        },

        validate: {
            note: isNotEmpty("Nhập ghi chú...")
        }
    });

    const handleSaveNote = async (values) => {
        if (values.name !== item?.name) {
            await callHistoryApis.updateCallName(item?._id, values.name);
        }

        const res = await callNoteApis.createNewCallNote(item?._id, values.note);

        if (res?.code === "success") {
            toast.success("Thêm note thành công");
            setLoading(false);
            close();
            getCdrData();
        } else {
            console.log("res", res);
            toast.error(res?.message);
        }
    };

    return (
        <>
            <Modal opened={opened} onClose={close} title={`Sửa thông tin: ${item?.name}`}>
                <form onSubmit={form.onSubmit(handleSaveNote)}>
                    <Flex direction='column' gap={10} c={theme.colors.gray[6]}>
                        <TextInput
                            disabled={loading}
                            label='Tên khách'
                            placeholder='Nhập tên khách'
                            key={form.key("name")}
                            {...form.getInputProps("name")}
                            styles={{
                                input: { color: theme.colors.gray[6] }
                            }}
                        />

                        <Textarea
                            disabled={loading}
                            rows={4}
                            label='Ghi chú:'
                            placeholder='Nhập ghi chú'
                            key={form.key("note")}
                            {...form.getInputProps("note")}
                            styles={{
                                input: { color: theme.colors.gray[6] }
                            }}
                        />

                        <Group justify='flex-end' mt='md'>
                            <Button loading={loading} type='submit' color='indigo' h={40}>
                                Lưu note
                            </Button>
                        </Group>
                    </Flex>
                </form>
            </Modal>

            <ActionIcon
                onClick={open}
                data-tooltip-id='app-tooltip'
                data-tooltip-content='Ghi chú cho cuộc gọi này!'
                variant='subtle'
                color={theme.colors.gray[5]}
                size='xl'
                radius='xl'
                aria-label='Settings'
            >
                <IconNote style={{ width: "50%", height: "50%" }} stroke={1.5} />
            </ActionIcon>
        </>
    );
};

export default BtnAddNote;
