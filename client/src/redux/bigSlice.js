import { configureStore } from "@reduxjs/toolkit";

import sliceReducer from "./requests";
import darkThemeReducer from "./darkTheme";
import authReducer from "./auth";

const store = configureStore({
    reducer: {
        darkThemeSlice: darkThemeReducer,
        authSlice: authReducer,
        requestSlice: sliceReducer,
    },
});

export default store;
