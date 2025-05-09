import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api.service";
import { initialState } from "./initialState";

export const fetchProfile = createAsyncThunk(
    "auth/fetchProfile",
    async (firebaseUid, { rejectWithValue }) => {
        try {
            const response = await api.get(`/user/profile/${firebaseUid}/`);
            return response.data;
        } catch (error: any) {
            if (error?.response?.data?.message) {
                return rejectWithValue(error.response.data.message);
            }
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Failed to fetch profile");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        clearAuth(state) {
            state.user = null;
            state.profile = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(fetchProfile.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to fetch profile";
            });
    },
});

export const { setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;