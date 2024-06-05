import axiosCustom from "./axiosCustom";
import moment from "moment";
import getToken from "./getToken";

const getCallByPhone = async (phone) => {
    try {
        const accessToken = getToken.getAccessToken();

        const data = await axiosCustom.get(`/call-list/get-call-by-phone/${phone}`, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });

        return data.data;
    } catch (err) {
        return err.response?.data;
    }
};

const makeNewCall = async (data) => {
    try {
        const accessToken = getToken.getAccessToken();

        const res = await axiosCustom.post(`/call-list/create-call`, data, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });

        return res.data;
    } catch (err) {
        return err.response?.data;
    }
};

const getCallByUser = async (activePage) => {
    try {
        const accessToken = getToken.getAccessToken();

        const res = await axiosCustom.get(`/call-list/get-calls-by-account-code?page=${activePage}`, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });

        return res.data;
    } catch (err) {
        return err.response?.data;
    }
};

const updateCall = async (phone) => {
    try {
        const accessToken = getToken.getAccessToken();
        const data = await axiosCustom.get(`/call-list/update-call/${phone}`, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });

        return data.data;
    } catch (err) {
        return err.response?.data;
    }
};

export default { getCallByPhone, makeNewCall, getCallByUser, updateCall };
