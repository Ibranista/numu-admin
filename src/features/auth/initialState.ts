import type { AuthState } from "./types";

export const initialState: AuthState = {
    user: {
        uid: "",
        role: "",
        email: "",
        first_name: "",
        last_name: "",
    },
    profile: null,
    loading: false,
    error: null,
};