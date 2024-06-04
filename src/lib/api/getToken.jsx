import { store } from "../../redux/store";

const getAccessToken = () => {
    const token = store.getState().auth.user;
    return token?.accessToken;
};

export default { getAccessToken };
