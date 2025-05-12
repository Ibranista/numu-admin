import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import { initialState } from "./initialState";

export const selectTherapistMatchesSlice = (state: RootState) => state?.matches || initialState;

export const selectTherapistMatches = createSelector(
    [selectTherapistMatchesSlice],
    state => state
);
