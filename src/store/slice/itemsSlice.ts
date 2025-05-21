import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "@/lib/axios";

interface ItemData {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  type: string;
  books: string[];
  finalproject: string[];
  tools: string[];
}

interface ItemsState {
  items: ItemData[];
  loading: boolean;
  error: string | null;
}


export const fetchItems = createAsyncThunk<ItemData[]>(
  "items/fetchItems",
  async (_, thunkAPI) => {
    try {
      const res = await axiosClient.get("/items/getAllItems");
      console.log("Items fetched successfully:", res.data);
      return res.data.data.flatMap((group: { item: ItemData[] }) => group.item);
    } catch (err: any) {
  
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Gagal fetch items");
    }
  }
);

const initialState: ItemsState = {
  items: [],
  loading: false,
  error: null,
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    clearItems: (state) => {
      state.items = [];
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
        // console.log("Items fetched successfully:", action.payload);
        state.loading = false;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearItems } = itemsSlice.actions;
export default itemsSlice.reducer;
