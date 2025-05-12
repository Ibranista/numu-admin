import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { getConcerns, createConcerns } from "./thunk.api";

const concernSlice = createSlice({
    name: "concerns",
    initialState,
    reducers: {
        clearConcerns(state) {
            state.concerns = [];
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getConcerns.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getConcerns.fulfilled, (state, action) => {
                state.loading = false;
                state.concerns = action.payload;
            })
            .addCase(getConcerns.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as { detail: string }).detail || "Failed to fetch expertise";
            })
            .addCase(createConcerns.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createConcerns.fulfilled, (state, action) => {
                state.loading = false;
                state.concerns = [...(state.concerns as any).results, action.payload];
            })
            .addCase(createConcerns.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as { detail: string }).detail || "Failed to create concerns";
            });
    },
});

export const { clearConcerns } = concernSlice.actions;
export default concernSlice.reducer;
