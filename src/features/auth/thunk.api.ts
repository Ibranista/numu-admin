import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api.service";
import type { IUser } from "./types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const feature = "/user";

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData: IUser, thunkAPI) => {
        try {
            console.log("userData", userData);
            const response = await api.post(`${feature}/register/`, userData);
            if (response.data) {
                const { email, password } = userData;
                console.log("start with firebase");
                await signInWithEmailAndPassword(auth, email, password as any);
                console.log("firebase success");
            }
            console.log("response", response);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (loginData: { email: string; password: string }, thunkAPI) => {
        try {
            const { email, password } = loginData;
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Login failed");
        }
    }
);
