import axiosCustom from "./axiosCustom";
import getToken from "./getToken";
import callHistoryApis from "./callHistoryApis";

const createNewCallNote = async (callId, note) => {
    try {
        const accessToken = getToken.getAccessToken();

        const data = await axiosCustom.post(
            `/call-note/create-note/${callId}`,
            { note },
            {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            }
        );

        if (data.data.code === "success") {
            await callHistoryApis.updateTimeUpdated(callId);
        }

        return data.data;
    } catch (err) {
        return err.response?.data;
    }
};

export default { createNewCallNote };
