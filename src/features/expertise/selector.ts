import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import { initialState } from "./initialState";

export const selectExpertiseSlice = (state: RootState) => state?.expertise || initialState;

export const selectExpertise = createSelector(
    [selectExpertiseSlice],
    state => state
);

