import axiosClient from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


interface UserState {
    name: string;
    email: string;
    image?: string;
    role: string; 
}


const initialState: UserState = {
    name: "",
    email: "",
    image: "",
    role: "USER",
};

const fetchUser = createAsyncThunk<UserState, string>(
    "user/fetchUser",
    async (userId, thunkAPI) => {
        try {
            const response = await axiosClient.get(`/user/getUserbyId/${userId}`);
            const data: UserState = response.data.data;
            if (!data) {
                return thunkAPI.rejectWithValue("User not found");
            }
            return data;
        } catch (error) {
            let errorMessage = "An unknown error occurred";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

