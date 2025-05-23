import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api.service";
import type { IConcern } from "./types";

const feature = "/concerns";

export const getConcerns = createAsyncThunk(
    "concerns/getConcerns",
    async (page: number = 1, thunkAPI) => {
        try {
            const response = await api.get(`${feature}/?page=${page}`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const createConcerns = createAsyncThunk(
    "concerns/createConcerns",
    async (concernData: { concerns: IConcern[] }, thunkAPI) => {
        try {
            const response = await api.post(`${feature}/`, concernData);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);
