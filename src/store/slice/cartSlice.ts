import axiosClient from "@/lib/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


enum Category {
    Tshirts = "Tshirt",
    Hoodies = "Hoodies",
    Streetwear = "Streetwear",
    Luxury = "luxury",
    Jackets = "Jackets",
    Sweatshirts = "Sweatshirts",
}
interface CartProps {
    userId: string;
    itemId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    totalPrice: number;
    stock?: number;
    type?: Category;
    isOnSale?: boolean;
}


interface CartState {
    cartId?: string;
    userId?: string;
    cartItems: CartProps[];
    addToCart?: CartProps;
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    cartItems: [],
    loading: false,
    error: null,
}

export const fetchCartItems = createAsyncThunk<CartProps[], string>(
    "cart/fetchCartItems",
    async (id, thunkAPI) => {
        try {
            const response = await axiosClient.get(`/cart/getCart/${id}`);
            if (response.status < 200 || response.status >= 300) {
                throw new Error("Failed to fetch cart items");
            }
            console.log("Cart items fetched successfully:", response.data.data.items);
            return response.data.data.items;
        } catch (error: any) {
            console.error("Fetch cart error:", error.response?.data || error.message);
            return thunkAPI.rejectWithValue("Failed to fetch cart items");
        }

    }
)
export const addToCart = createAsyncThunk<CartProps, CartProps>(
    "cart/addToCart",
    async (item, thunkAPI) => {
        try {
            const response = await axiosClient.post("/cart/addToCart", item);
            if (response.status < 200 || response.status >= 300) {
                throw new Error("Failed to add item to cart");
            }
            console.log("Item added to cart successfully:", response.data.data.items[0]);
            return response.data.data.items[0]
        } catch (error: any) {
            console.error("Fetch cart error:", error.response?.data || error.message);
            return thunkAPI.rejectWithValue("Failed to fetch cart items");
        }
    }
);

export const clearCartAsync = createAsyncThunk<CartProps[], string>(
    'cart/clearCart',
    async (id, thunkAPI) => {
        try {
            const response = await axiosClient.delete(`/cart/clearCart/${id}`);
            if (response.status < 200 || response.status >= 300) {
                throw new Error("Failed to clear cart");
            }
            console.log("Cart cleared successfully:", response.data);
            return response.data.data?.items || response.data.items || [];
        } catch (error: any) {
            console.error("Clear cart error:", error.response?.data || error.message);
            if (error.response?.status === 404) {
                console.log("Cart not found, might already be empty");
                return [];
            }
            return thunkAPI.rejectWithValue(
                error.response?.data?.errors ||
                error.response?.data?.message ||
                "Failed to clear cart"
            );
        }
    }
)
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (
            state: CartState
        ) => {
            state.cartItems = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItems.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.cartItems = action.payload;
                state.userId = action.payload[0]?.userId || "";
                state.loading = false;
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = typeof action.payload === "string" ? action.payload : "Failed to fetch cart items";
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                const existingIndex = state.cartItems.findIndex(
                    (item) => item.itemId === action.payload.itemId
                );

                if (existingIndex >= 0) {
                    const existingItem = state.cartItems[existingIndex];
                    existingItem.quantity += action.payload.quantity;
                    existingItem.totalPrice = existingItem.quantity * existingItem.price;
                } else {
                    state.cartItems.push(action.payload);
                }

                state.userId = action.payload.userId;
                state.loading = false;
            })

    }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
