import axiosCustom from "./axiosCustom";
import moment from "moment";
import getToken from "./getToken";

const getCallByEmail = async (activePage) => {
    try {
        const accessToken = getToken.getAccessToken();

        const res = await axiosCustom.get(`/call-history/get-call-data-by-email?page=${activePage}`, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });

        return res.data;
    } catch (err) {
        return err.response?.data;
    }
};

const updateTimeUpdated = async (id) => {
    try {
        const accessToken = getToken.getAccessToken();
        const data = await axiosCustom.get(`/call-history/update-time/${id}`, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });

        return data.data;
    } catch (err) {
        return err.response?.data;
    }
};

const updateCallName = async (id, name) => {
    try {
        const accessToken = getToken.getAccessToken();
        const data = await axiosCustom.post(
            `/call-history/update-name/${id}`,
            { name },
            {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            }
        );

        return data.data;
    } catch (err) {
        return err.response?.data;
    }
};

const createNewCall = async (phone) => {
    try {
        const accessToken = getToken.getAccessToken();
        const data = await axiosCustom.post(
            `/call-history/create-new-call`,
            { phoneNumber: phone },
            {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            }
        );

        return data.data;
    } catch (err) {
        return err.response?.data;
    }
};

const getCallByPhone = async (phone) => {
    try {
        const accessToken = getToken.getAccessToken();
        const data = await axiosCustom.get(`/call-history/get-call-data-by-phone/${phone}`, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });

        return data.data;
    } catch (err) {
        return err.response?.data;
    }
};

const getCallByPhoneAndEmail = async (phone) => {
    try {
        const accessToken = getToken.getAccessToken();
        const data = await axiosCustom.get(`/call-history/get-call-data-by-phone-and-email/${phone}`, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });

        return data.data;
    } catch (err) {
        return err.response?.data;
    }
};

export default {
    getCallByEmail,
    updateTimeUpdated,
    updateCallName,
    getCallByPhone,
    createNewCall,
    getCallByPhoneAndEmail
};
