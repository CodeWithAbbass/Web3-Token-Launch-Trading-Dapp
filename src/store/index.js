import { configureStore } from "@reduxjs/toolkit";
import essentialReducer from "./slices/essentialSlice";

const store = configureStore({
    reducer: {
        essential: essentialReducer,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({ serializableCheck: false }),
    ],
    devTools: true,
});

export default store;
