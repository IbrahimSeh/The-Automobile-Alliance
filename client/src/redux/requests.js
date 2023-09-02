import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    numOfRequest: null,
};

const requestSlice = createSlice({
    name: "request",
    initialState,
    reducers: {
        setNumOfReq(state, action) {
            state.numOfRequest = action.payload;

        },
    },
});

export const requestActions = requestSlice.actions;

export default requestSlice.reducer;
