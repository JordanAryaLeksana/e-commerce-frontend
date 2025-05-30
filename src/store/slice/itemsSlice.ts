import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "@/lib/axios";
import Cookies from "js-cookie";

enum ItemType {
  books = "books",
  project = "projects",
  tools = "tools",
}

interface ItemData {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  type: keyof typeof ItemType;
  books: string[];
  finalproject: string[];
  tools: string[];
}

interface ItemsState {
  items: ItemData[];
  category: ItemData[];
  loading: boolean;
  error: string | null;
  initialcategory: keyof typeof ItemType;
}


export const fetchItems = createAsyncThunk<ItemData[]>(
  "items/fetchItems",
  async (_, thunkAPI) => {
    try {
      const res = await axiosClient.get("/items/getAllItems");
      console.log("Items fetched successfully:", res.data);

      return res.data.data.flatMap((group: { item: ItemData[] }) => group.item);
    } catch (err: any) {
      console.error("Error in fetchItems:", err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Gagal fetch items");
    }
  }
);

export const getItemsByCategory = createAsyncThunk<ItemData[], string>(
  "items/getItemsByCategory",
  async (type, thunkAPI) => {
    try {
      const res = await axiosClient.get(`/items/getItemsByType/${type}`);
      console.log("Items by category fetched successfully:", res.data);

      return res.data.data.flatMap((group: { item: ItemData[] }) => group.item);
    } catch (err: any) {
      console.error("Error in getItemsByCategory:", err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Gagal fetch items");
    }
  }
);

const initialState: ItemsState = {
  items: [],
  category: [],
  loading: false,
  error: null,
  initialcategory: "books",
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    clearItems: (state) => {
      state.items = [];
      state.category = [];
    },
    setInitialCategory: (state, action) => {
      state.initialcategory = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.category = state.items.filter(item => item.type === "books");
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("fetchItems rejected:", action.payload);
      })
      
      // getItemsByCategory cases
      .addCase(getItemsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getItemsByCategory.fulfilled, (state, action) => {
        if (action.payload.length > 0) {
          state.category = action.payload;
        } else {
          state.category = state.items.filter(item => item.type === "books");
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(getItemsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error("getItemsByCategory rejected:", action.payload);
        state.category = state.items.filter(item => item.type === "books");
      });
  },
});

export const { clearItems, clearError } = itemsSlice.actions;
export default itemsSlice.reducer;