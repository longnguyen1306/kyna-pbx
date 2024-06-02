import { Button, Flex, Group, PasswordInput, TextInput } from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userLoginByThunk } from "../../../redux/slices/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const form = useForm({
        mode: "uncontrolled",
        validateInputOnChange: true,
        initialValues: {
            email: "",
            password: ""
        },

        validate: {
            email: isEmail("Email không hợp lệ"),
            password: isNotEmpty("Mật khẩu không được để trống")
        }
    });

    const handleLogin = (values) => {
        setLoading(true);

        dispatch(userLoginByThunk(values))
            .then(unwrapResult)
            .then((res) => {
                if (res?.code === "error") {
                    toast.error(res?.message);
                    setLoading(false);
                    return;
                }
                toast.success(res?.message);
                setLoading(false);
                return navigate(location.state?.from ? location.state?.from : "/");
            })
            .catch((err) => {
                // handle result here
                console.log("err", err);
                setLoading(false);
            });
    };

    return (
        <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
            <Flex direction='column' gap={10}>
                <TextInput
                    withAsterisk
                    disabled={loading}
                    label='Email:'
                    placeholder='Nhập email...'
                    key={form.key("email")}
                    {...form.getInputProps("email")}
                />

                <PasswordInput
                    disabled={loading}
                    withAsterisk
                    label='Mật khẩu:'
                    // size='md'
                    placeholder='Nhập mật khẩu...'
                    key={form.key("password")}
                    {...form.getInputProps("password")}
                />
            </Flex>

            <Group justify='flex-end' mt={30}>
                <Button type='submit' color={"indigo"} size={"sm"} loading={loading}>
                    Đăng nhập
                </Button>
            </Group>
        </form>
    );
};

export default LoginForm;
