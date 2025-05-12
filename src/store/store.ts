import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counter.slice";
import authReducer from "../features/auth/auth.slice";
import expertiseReducer from "../features/expertise/expertise.slice";
import therapistsReducer from "../features/therapists/therapists.slice";
import concernsReducer from "../features/concerns/concerns.slice";
import childrenReducer from "../features/children/children.slice";
import matchesReducer from "../features/therapistMatches/matches.slice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        expertise: expertiseReducer,
        therapists: therapistsReducer,
        concerns: concernsReducer,
        children: childrenReducer,
        matches: matchesReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;