import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosClient from '@/lib/axios';
import { clear } from 'console';

export enum Status {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
    PROCESSING = 'PROCESSING',
}


export interface Order {
    orderId: string;
    userId: string;
    items: {
        itemId: string;
        name: string;
        quantity: number;
        price: number;
    }[];
    totalPrice: number;
    orderDate: string;
    status: keyof typeof Status;
}

interface OrderState {
    orders: Order[];
    loading: boolean;
    error: string | null;
}
const initialState: OrderState = {
    orders: [],
    loading: false,
    error: null,
};
export const createOrderAsync = createAsyncThunk<Order,Order>(
    'order/createOrder',
    async (orderData, thunkAPI) => {
        try {
            const response = await axiosClient.post("/order/createOrder", orderData);
            console.log("Order created successfully:", response.data);
            return response.data.data;
        } catch (error: any) {
            console.error("Error in createOrderAsync:", error);
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to create order');
        }
    }
);


const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<Order[]>) => {
            state.orders = action.payload;
        },
        clearOrders: (state) => {
            state.orders = [];
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrderAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrderAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.orders.push(action.payload);
            })
            .addCase(createOrderAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    
    },
});
export const { setOrders, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;