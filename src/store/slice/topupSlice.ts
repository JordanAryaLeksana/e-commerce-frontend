import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TopupState{
    jenisTopup: string;
    nominalTopup: string;
    nomorTopup: string;
}

const initialState: TopupState = {
    jenisTopup: "",
    nominalTopup: "",
    nomorTopup: "",
};



const topupSlice = createSlice({
    name: "topup",
    initialState,
    reducers:{
        setJenisTopup: (state, action: PayloadAction<string>) => {
            state.jenisTopup = action.payload;
        },
        setNominalTopup: (state, action: PayloadAction<string>) => {
            state.nominalTopup = action.payload;
        },
        setNomorTopup: (state, action: PayloadAction<string>) => {
            state.nomorTopup = action.payload;
        },
    }
})

export const { setJenisTopup, setNominalTopup, setNomorTopup } = topupSlice.actions;
export default topupSlice.reducer;