import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counter.slice";
import authReducer from "../features/auth/auth.slice";
import expertiseReducer from "../features/expertise/expertise.slice";
import therapistsReducer from "../features/therapists/therapists.slice";
import concernsReducer from "../features/concerns/concerns.slice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        expertise: expertiseReducer,
        therapists: therapistsReducer,
        concerns: concernsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;