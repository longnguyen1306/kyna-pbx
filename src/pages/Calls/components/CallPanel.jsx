import { ActionIcon, Flex, Input } from "@mantine/core";
import styles from "../../../assets/styles/Calls.module.scss";
import { IconPhone } from "@tabler/icons-react";

const CallPanel = ({ phoneNumber, setPhoneNumber, handleClickCall }) => {
    return (
        <>
            <Flex direction='column' align='center' gap={20}>
                <Input
                    className={styles.callInput}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    size={"md"}
                    placeholder='Nhập số điện thoại cần gọi...'
                />

                <ActionIcon
                    className={styles.callBtn}
                    onClick={() => handleClickCall(phoneNumber)}
                    variant='filled'
                    color='indigo'
                    size={50}
                    radius='xl'
                    aria-label='Settings'
                >
                    <IconPhone style={{ width: "60%", height: "60%" }} stroke={1.5} />
                </ActionIcon>
            </Flex>

            <Flex>ss</Flex>

            <Flex mb={40} align='center' justify='space-between'>
                <Flex></Flex>

                {/*<ActionIcon*/}
                {/*    onClick={handleClickCall}*/}
                {/*    variant='filled'*/}
                {/*    color='indigo'*/}
                {/*    size={60}*/}
                {/*    radius='xl'*/}
                {/*    aria-label='Settings'*/}
                {/*>*/}
                {/*    <IconPhone style={{ width: "60%", height: "60%" }} stroke={1.5} />*/}
                {/*</ActionIcon>*/}

                <Flex></Flex>
            </Flex>
        </>
    );
};

export default CallPanel;
