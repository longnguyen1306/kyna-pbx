import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sipStatus: null,
    wsStatus: null,
    callStatus: null,
    callDirection: null
};

export const jsSipSlice = createSlice({
    name: "jsSip",
    initialState,
    reducers: {
        handleSetSipStatus: (state, action) => {
            state.sipStatus = action.payload;
        },
        handleSetWsStatus: (state, action) => {
            state.wsStatus = action.payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { handleSetSipStatus, handleSetWsStatus } = jsSipSlice.actions;

export default jsSipSlice.reducer;
