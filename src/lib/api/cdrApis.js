import axiosCustom from "./axiosCustom";
import moment from "moment";
import getToken from "./getToken";

const getCdrByUser = async () => {
    try {
        const startTime = moment(Date.now()).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).unix();
        const endTime = moment(Date.now()).set({ hour: 23, minute: 59, second: 59, millisecond: 0 }).unix();
        const accessToken = getToken.getAccessToken();

        const data = await axiosCustom.get(
            `/cdrs/get-cdr-by-user?startTime=${startTime}&endTime=${endTime}`,
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

        const data = await axiosCustom.get(`/cdrs/get-cdr-by-phone?phone=${phone}`, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });

        return data.data;
    } catch (err) {
        return err.response?.data;
    }
};

export default { getCdrByUser, getCdrsByPhone };
