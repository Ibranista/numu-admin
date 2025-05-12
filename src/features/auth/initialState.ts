import type { AuthState, IProfileState } from "./types";

export const profileInitialState: IProfileState = {
    profile: null,
    loading: false,
    error: null,
};

export const initialState: AuthState = {
    user: {
        uid: "",
        role: "",
        email: "",
        first_name: "",
        last_name: "",
    },
    loading: false,
    error: null,
};