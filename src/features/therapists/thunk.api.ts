import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api.service";

const feature = "/therapist";

export const getTherapists = createAsyncThunk(
    "therapists/getTherapists",
    async (_, thunkAPI) => {
        try {
            const response = await api.get(`${feature}/`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createTherapist = createAsyncThunk(
    "therapists/createTherapist",
    async (therapistData: FormData, thunkAPI) => {
        try {
            const response = await api.post(`${feature}/`, therapistData);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);
