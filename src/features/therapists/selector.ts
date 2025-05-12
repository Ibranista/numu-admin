import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import { initialState } from "./initialState";

export const selectTherapistSlice = (state: RootState) => state?.therapists || initialState;

export const selectTherapist = createSelector(
    [selectTherapistSlice],
    state => state
);

