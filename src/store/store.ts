import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counter.slice";
import authReducer from "../features/auth/auth.slice";
import expertiseReducer from "../features/expertise/expertise.slice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        expertise: expertiseReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;