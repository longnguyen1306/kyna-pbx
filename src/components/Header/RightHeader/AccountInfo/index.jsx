import { Menu, rem, Avatar, useMantineTheme } from "@mantine/core";
import { IconSettings, IconMessageCircle, IconLogout } from "@tabler/icons-react";

const AccountInfo = () => {
    const theme = useMantineTheme();

    return (
        <Menu shadow='md' width={200} position={"bottom-end"} withArrow>
            <Menu.Target>
                <Avatar
                    style={{
                        cursor: "pointer"
                    }}
                    src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png'
                    alt='DVE'
                />
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item
                    color={theme.colors.gray[7]}
                    leftSection={<IconSettings style={{ width: rem(18), height: rem(18) }} />}
                >
                    Admin dashboard
                </Menu.Item>
                <Menu.Item
                    color={theme.colors.gray[7]}
                    leftSection={<IconMessageCircle style={{ width: rem(18), height: rem(18) }} />}
                >
                    Thông tin tài khoản
                </Menu.Item>

                <Menu.Divider />

                <Menu.Item
                    color='red'
                    leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} />}
                >
                    Đăng xuất
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default AccountInfo;
