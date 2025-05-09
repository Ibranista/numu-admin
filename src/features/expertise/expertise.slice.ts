import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { getExpertise, createExpertise } from "./thunk.api";

const expertiseSlice = createSlice({
    name: "expertise",
    initialState,
    reducers: {
        clearExpertise(state) {
            state.expertise = [];
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getExpertise.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getExpertise.fulfilled, (state, action) => {
                state.loading = false;
                state.expertise = action.payload;
            })
            .addCase(getExpertise.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as { detail: string }).detail || "Failed to fetch expertise";
            })
            .addCase(createExpertise.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createExpertise.fulfilled, (state, action) => {
                state.loading = false;
                state.expertise = [...state.expertise, action.payload];
            })
            .addCase(createExpertise.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as { detail: string }).detail || "Failed to create expertise";
            });
    },
});

export const { clearExpertise } = expertiseSlice.actions;
export default expertiseSlice.reducer;
