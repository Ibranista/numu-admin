import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { getTherapists, createTherapist } from "./thunk.api";

const therapistsSlice = createSlice({
    name: "therapists",
    initialState: initialState,
    reducers: {
        clearTherapists(state) {
            state.therapists = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTherapists.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTherapists.fulfilled, (state, action) => {
                state.loading = false;
                state.therapists = action.payload;
            })
            .addCase(getTherapists.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as { detail: string }).detail || "Failed to fetch therapists";
            })
            .addCase(createTherapist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTherapist.fulfilled, (state, action) => {
                state.loading = false;
                state.therapists = [...state.therapists, action.payload];
            })
            .addCase(createTherapist.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as { detail: string }).detail || "Failed to create therapist";
            });
    },
});

export const { clearTherapists } = therapistsSlice.actions;
export default therapistsSlice.reducer;
