import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sipStatus: null,
    wsStatus: null,
    callStatus: null,
    sipNumber: null,
    callDirection: null,
    inCall: false
};

export const jsSipSlice = createSlice({
    name: "jsSip",
    initialState,
    reducers: {
        handleSetSipStatus: (state, action) => {
            state.sipStatus = action.payload;
        },
        handleSetSipNumber: (state, action) => {
            state.sipNumber = action.payload;
        },
        handleSetWsStatus: (state, action) => {
            state.wsStatus = action.payload;
        },
        handleSetInCall: (state, action) => {
            console.log("action.payload", action.payload);
            state.inCall = action.payload;
        },
        handleSetCallStatus: (state, action) => {
            state.callStatus = action.payload;
        },
        handleSetCallDirection: (state, action) => {
            state.callDirection = action.payload;
        }
    }
});

export const {
    handleSetSipStatus,
    handleSetWsStatus,
    handleSetInCall,
    handleSetCallStatus,
    handleSetCallDirection,
    handleSetSipNumber
} = jsSipSlice.actions;

export default jsSipSlice.reducer;
