import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api.service";
import type { IUser } from "./types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const feature = "/user";

export const getUserProfile = createAsyncThunk(
    "auth/getUserProfile",
    async (firebaseUid: string, thunkAPI) => {
        try {
            const response = await api.get(`${feature}/profile/${firebaseUid}/`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// export const registerUser = createAsyncThunk(
//     "auth/registerUser",
//     async (userData: IUser, thunkAPI) => {
//         try {
//             console.log("userData", userData);
//             const response = await api.post(`${feature}/register/`, userData);
//             if (response.data) {
//                 const { email, password } = userData;
//                 console.log("start with firebase");
//                 await signInWithEmailAndPassword(auth, email, password as any);
//                 console.log("firebase success");
//             }
//             console.log("response", response);
//             return response.data;
//         } catch (error: any) {
//             return thunkAPI.rejectWithValue(error.response.data);
//         }
//     }
// );

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData: IUser, thunkAPI) => {
        try {
            const response = await api.post(`${feature}/register/`, userData);
            if (response.data) {
                const { email, password } = userData;
                await signInWithEmailAndPassword(auth, email, password as any);
                await new Promise<void>((resolve) => {
                    const unsubscribe = auth.onAuthStateChanged((user) => {
                        if (user) {
                            resolve();
                            unsubscribe();
                        }
                    });
                });
            }
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
            console.log("userCredential", userCredential);
            return {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                first_name: "",
                last_name: "",
                role: "",
                firebase_uid: userCredential.user.uid,
            }
            // return userCredential.user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message || "Login failed");
        }
    }
);
