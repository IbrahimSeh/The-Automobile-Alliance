import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    display: {
        home: false,//false => tabs, true => tables
        requests: false,
        favCar: false,
        favVAR: false,
        sellers: false,
    },
};

const displaySlice = createSlice({
    name: "display",
    initialState,
    reducers: {
        setDisplayPage(state, action) {
            state.display[action.payload] = !state.display[action.payload];

        },
    },
});

export const displayActions = displaySlice.actions;

export default displaySlice.reducer;
