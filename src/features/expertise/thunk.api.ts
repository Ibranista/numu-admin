import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api.service";
import type { IExpertise } from "./types";

const feature = "/expertise";

export const getExpertise = createAsyncThunk(
    "expertise/getExpertise",
    async (_, thunkAPI) => {
        try {
            const response = await api.get(`${feature}/`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const createExpertise = createAsyncThunk(
    "expertise/createExpertise",
    async (expertiseData: IExpertise, thunkAPI) => {
        try {
            const response = await api.post(`${feature}/`, expertiseData);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);
