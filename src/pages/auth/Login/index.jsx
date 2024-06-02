import { Flex, Text, useMantineTheme } from "@mantine/core";
import LoginForm from "./LoginForm";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Login = () => {
    const theme = useMantineTheme();
    const { user, isLoading } = useSelector((state) => state.auth);
    const location = useLocation();

    if (user) return <Navigate to={location.state?.from ? location.state?.from : "/"} />;

    return (
        <Flex align='center' justify='center' h='100vh' bg={theme.colors.gray[1]} c={theme.colors.gray[7]}>
            <Flex
                bg='white'
                px={20}
                py={20}
                w={400}
                direction='column'
                gap={10}
                style={{
                    borderRadius: 6,
                    boxShadow: theme.shadows.sm
                }}
            >
                <Text
                    style={{
                        fontSize: 16,
                        textTransform: "uppercase",
                        fontWeight: 600
                    }}
                >
                    Login Pbx
                </Text>

                <LoginForm />
            </Flex>
        </Flex>
    );
};

export default Login;
