import { createSlice } from "@reduxjs/toolkit";
import Logout from "./Logout";

const initialState = {
    timer: 0,
};

const timerSlice = createSlice({
    name: "timer",
    initialState,
    reducers: {
        initTimer(state) {
            console.log("in initTimer");
            state.timer = setTimeout(() => {
                Logout();
            }, "3000");
        },
        stopTimer(state) {
            console.log('in stopTimer');
            clearTimeout(state.timer);
        },
    },
});

export const timerActions = timerSlice.actions;

export default timerSlice.reducer;
