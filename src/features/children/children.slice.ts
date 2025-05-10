import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { getChildren } from "./thunk.api";

const childrenSlice = createSlice({
  name: "children",
  initialState,
  reducers: {
    clearChildren(state) {
      state.children = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChildren.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChildren.fulfilled, (state, action) => {
        state.loading = false;
        state.children = action.payload;
      })
      .addCase(getChildren.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as { detail?: string })?.detail || "Failed to fetch children";
      });
  },
});

export const { clearChildren } = childrenSlice.actions;
export default childrenSlice.reducer;
