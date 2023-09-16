import { configureStore } from "@reduxjs/toolkit";

import displayReducer from "./display";
import sliceReducer from "./requests";
import darkThemeReducer from "./darkTheme";
import authReducer from "./auth";
import timerReducer from "./timer";

const store = configureStore({
    reducer: {
        darkThemeSlice: darkThemeReducer,
        authSlice: authReducer,
        requestSlice: sliceReducer,
        displaySlice: displayReducer,
        timerSlice: timerReducer,
    },
});

export default store;
