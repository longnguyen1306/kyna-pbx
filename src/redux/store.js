import { configureStore } from "@reduxjs/toolkit";
import authReduce from "../redux/slices/authSlice";
import jsSipReduce from "../redux/slices/jsSipSlice";

export const store = configureStore({
    reducer: {
        auth: authReduce,
        jsSip: jsSipReduce
    }
});
