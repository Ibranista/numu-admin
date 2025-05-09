import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import { initialState } from "./counter.slice";

const selectSlice = (state: RootState) => state?.counter || initialState;

export const selectCount = createSelector(
    [selectSlice],
    state => state.value
)