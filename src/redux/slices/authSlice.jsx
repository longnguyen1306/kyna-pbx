import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosCustom from "../../lib/api/axiosCustom";

export const userLoginByThunk = createAsyncThunk(
    "auth/userLoginByThunk",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosCustom.post(`/auth/login`, data);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    isLoading: false
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userLoginByThunk.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(userLoginByThunk.fulfilled, (state, action) => {
            if (action.payload.code === "success") {
                state.user = action.payload?.data;
                localStorage.setItem("user", JSON.stringify(action.payload?.data));
                state.isLoading = false;
            }
            state.isLoading = false;
        });
        builder.addCase(userLoginByThunk.rejected, (state, action) => {
            console.log("rejected", action);
        });
    }
});

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions;

export default authSlice.reducer;
