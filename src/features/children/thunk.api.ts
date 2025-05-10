import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api.service";
import type { IChildrenResponse, IGetChildrenArgs, ISuggestTherapistPayload } from "./types";

const feature = "/children";

export const getChildren = createAsyncThunk<
    IChildrenResponse,
    IGetChildrenArgs | undefined,
    { rejectValue: any }
>(
    "children/getChildren",
    async (args = { page: 1, limit: 5 }, thunkAPI) => {
        try {
            const { page = 1, limit = 5 } = args;
            const response = await api.get(`${feature}/?limit=${limit}&page=${page}`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const suggestTherapist = createAsyncThunk<
    any,
    ISuggestTherapistPayload
>(
    "children/suggestTherapist",
    async (childData, thunkAPI) => {
        try {
            const response = await api.post(`/therapistsMatch/`, childData);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
)