import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '@/lib/axios';


enum Category {
    Tshirts = "Tshirt",
    Hoodies = "Hoodies",
    Streetwear = "Streetwear",
    Luxury = "luxury",
    Jackets = "Jackets",
    Sweatshirts = "Sweatshirts",
}
type DetailItems = {
    id: string;
    name: string;
    type: Category;
    price: number;
    description: string;
    image: string;
    stock: number;
    books: string[];
    finalproject: string[];
    tools: string[];
}

type ItemsDetailState = {
    items: DetailItems[];
    loading: boolean;
    error: string | null;
}

const initialState: ItemsDetailState = {
    items: [],
    loading: false,
    error: null,
};


export const fetchItemByTypeAndName = createAsyncThunk(
    'items/fetchItemByTypeAndName',
    async ({ type, name }: { type: string; name: string }) => {
        try {
            const res = await axiosClient.get(`/items/getItemsbyTypeandName/${type}/${name}`);
            console.log('Item fetched:', res.data.data);
            return res.data.data.item;
        } catch (err: any) {
            console.error('Error fetching items:', err);
            throw new Error(err.response?.data?.message || 'Gagal fetch items');
        }
    }
);




const detailSlice = createSlice({
    name: "itemsDetail",
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<DetailItems[]>) => {
            state.items = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchItemByTypeAndName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchItemByTypeAndName.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchItemByTypeAndName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
})

export const { setItems, setLoading, setError } = detailSlice.actions;
export default detailSlice.reducer;