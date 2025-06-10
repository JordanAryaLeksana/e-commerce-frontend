import axiosClient from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface QuantityState {
    quantity: number;
    cartId?: string;
    productId?: string;
}
const initialState: QuantityState = {
    quantity: 1,
};

export const fetchDecrement = createAsyncThunk(
    "quantity/fetchDecrement",
    async (
        { productId, cartId }: { productId: string; cartId: string },
        thunkAPI
    ) => {
        try {
            const response = await axiosClient.get(`/cart/decreaseQuantity/${cartId}/${productId}`);
            console.log("icrement", response.data.data.quantity);
            console.log("Decrement response:", response.data);
            if (response.status < 200 || response.status >= 300) {
                throw new Error("Failed to decrement quantity");
            }
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchIncrement = createAsyncThunk(
    "quantity/fetchIncrement",
    async (
        { productId, cartId }: { productId: string; cartId: string },
        thunkAPI
    ) => {
        try {
            const response = await axiosClient.get(`/cart/increaseQuantity/${cartId}/${productId}`);
            console.log("Increment response:", response.data);
            console.log("icrement", response.data.data.quantity);
            if (response.status < 200 || response.status >= 300) {
                throw new Error("Failed to increment quantity");
            }           
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const quantitySlice = createSlice({
    name: "quantity",
    initialState,
    reducers: {
        incrementQuantity: (state) => {
            state.quantity += 1;
        },
        decrementQuantity: (state) => {
            if (state.quantity > 1) {
                state.quantity -= 1;
            }
        },
        resetQuantity: (state) => {
            state.quantity = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIncrement.fulfilled, (state, action) => {
                if (typeof action.payload?.data?.quantity === "number") {
                    state.quantity = action.payload.data.quantity;
                }
            })
            .addCase(fetchDecrement.fulfilled, (state, action) => {
                if (typeof action.payload?.data?.quantity === "number") {
                    state.quantity = action.payload.data.quantity;
                }
            });
    }
});

export const { incrementQuantity, decrementQuantity, resetQuantity } = quantitySlice.actions;
export default quantitySlice.reducer;