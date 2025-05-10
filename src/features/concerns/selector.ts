import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import { initialState } from "./initialState";

export const selectConcernsSlice = (state: RootState) => state?.concerns || initialState;

export const selectConcerns = createSelector(
    [selectConcernsSlice],
    state => state
);

