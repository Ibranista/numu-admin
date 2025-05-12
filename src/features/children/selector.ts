import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import { initialState } from "./initialState";

export const selectChildrenSlice = (state: RootState) => state?.children || initialState;

export const selectChildren = createSelector(
    [selectChildrenSlice],
    state => state
);
