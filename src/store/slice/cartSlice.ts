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
    cartId: string;
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

interface CheckoutCartProps {
    userId: string;
    items: {
        itemId: string;
        name: string;
        quantity: number;
        price: number;
    }[]
    total: number;
    status: string;
}
interface CartState {
    cartId?: string;
    // userId?: string;
    checkoutResult?: any;

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
            console.log("Cart Quantity:", response.data.data.items.length)
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


export const updateCartItemAsync = createAsyncThunk<CartProps, CartProps>(
    'cart/updateCartItem',
    async (item, thunkAPI) => {
        try {
            const response = await axiosClient.put(`/cart/updateCartItem/${item.cartId}`, item);
            if (response.status < 200 || response.status >= 300) {
                throw new Error("Failed to update cart item");
            }
            console.log("Cart item updated successfully:", response.data.data.items[0]);
            return response.data.data.items[0];
        } catch (error: any) {
            console.error("Update cart item error:", error.response?.data || error.message);
            return thunkAPI.rejectWithValue(
                error.response?.data?.errors ||
                error.response?.data?.message ||
                "Failed to update cart item"
            );
        }
    }
)

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
        removeItem: (
            state: CartState,
            action: { payload: string }
        ) => {
            state.cartItems = state.cartItems.filter(item => item.itemId !== action.payload);
        },
        updateQuantity: (
            state: CartState,
            action: { payload: { itemId: string; quantity: number } }
        ) => {
            const { itemId, quantity } = action.payload;
            const item = state.cartItems.find((item) => item.itemId === itemId);
            if (item) {
                item.quantity = quantity;
                item.totalPrice = item.price * quantity;
            }
            console.log("Updated item quantity:", itemId, "to", quantity)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItems.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.cartItems = action.payload;
                // state.userId = action.payload[0]?.userId || "";
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

                state.cartId = action.payload.cartId;
                state.loading = false;
            })
    


    }
});

export const { clearCart, updateQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
