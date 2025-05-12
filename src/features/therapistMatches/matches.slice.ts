import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { suggestTherapist } from "../children/thunk.api";

const matchesSlice = createSlice({
    name: "therapistMatches",
    initialState,
    reducers: {
        clearMatches(state) {
            state.data = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(suggestTherapist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(suggestTherapist.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(suggestTherapist.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as { detail: string }).detail || "Failed to fetch therapist matches";
            });
    }
});

export const { clearMatches } = matchesSlice.actions;
export default matchesSlice.reducer;
