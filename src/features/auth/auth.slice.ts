import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { registerUser } from "./thunk.api";

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        clearAuth(state) {
            state.user = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as { detail: string }).detail || "Failed to register user";
            });
    },
});

export const { setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;