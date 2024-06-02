import { configureStore } from "@reduxjs/toolkit";
import authReduce from "../redux/slices/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReduce
    }
});
