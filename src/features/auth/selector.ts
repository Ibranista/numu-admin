import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import { initialState } from "./initialState";

const selectAuthSlice = (state: RootState) => state?.auth || initialState;

export const selectAuthUser = createSelector(
    [selectAuthSlice],
    state => state
);