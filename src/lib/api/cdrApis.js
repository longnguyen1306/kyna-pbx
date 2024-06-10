import axiosCustom from "./axiosCustom";
import moment from "moment";
import getToken from "./getToken";

const updateCdrAfterCall = async () => {
    try {
        const accessToken = getToken.getAccessToken();

        const data = await axiosCustom.post(
            `/cdr/update-cdr-after-call`,
            {},
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

const getCdrsByPhone = async (phone) => {
    try {
        const accessToken = getToken.getAccessToken();

        const data = await axiosCustom.get(`/cdr/get-call-log-by-phone/${phone}`, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });

        return data.data;
    } catch (err) {
        return err.response?.data;
    }
};

const getCallNoteData = async (item) => {
    try {
        const accessToken = getToken.getAccessToken();

        const data = await axiosCustom.get(`/call-note/get-call-note-by-call-id/${item._id}`, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });

        return data.data;
    } catch (err) {
        return err.response?.data;
    }
};

export default { updateCdrAfterCall, getCdrsByPhone, getCallNoteData };
