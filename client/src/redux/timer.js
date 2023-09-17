import { createSlice } from "@reduxjs/toolkit";
import useLogout from "../hooks/useLogout";

const logout = useLogout;
const initialState = {
    timer: 0,
};

const timerSlice = createSlice({
    name: "timer",
    initialState,
    reducers: {
        initTimer(state, action) {
            //console.log("in initTimer action = ", action.payload);
            state.timer = setTimeout(() => {
                logout();
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
