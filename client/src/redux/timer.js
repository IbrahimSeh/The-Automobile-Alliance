import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    timer: 0,
};

const timerSlice = createSlice({
    name: "timer",
    initialState,
    reducers: {
        initTimer(state, action) {
            state.timer = 0;
            // var timeoutHandle = setTimeout(() => {
            //     localStorage.removeItem("token");
            //     dispatch(authActions.logout());
            //     toast.warning("Delayed for 4 second you are logged out automatically.");
            // }, "4000");
        },
        resetTimer(state) {
            state.timer = 0;
        },
    },
});

export const timerActions = timerSlice.actions;

export default timerSlice.reducer;
