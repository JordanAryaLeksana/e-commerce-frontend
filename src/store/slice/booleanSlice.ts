import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum BooleanAction {
  Tshirts = "Tshirts",
  Hoodies = "Hoodies",
  Streetwear = "Streetwear",
  Luxury = "Luxury",
  Jackets = "Jackets",
  Sweatshirts = "Sweatshirts",
}

interface BooleanState {
  isOpen: boolean;
  action?: BooleanAction;
}

const initialState: BooleanState = {
  isOpen: false,
  action: BooleanAction.Tshirts,
};

const booleanSlice = createSlice({
  name: "boolean",
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setIsOpenFalse: (state) => {
      state.isOpen = false;
    },
    setAction: (state, action: PayloadAction<BooleanAction>) => {
      state.action = action.payload;
    },
    toggleIsOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
  
  }
});

export const { setIsOpen, setIsOpenFalse, setAction, toggleIsOpen } = booleanSlice.actions;
export default booleanSlice.reducer;
