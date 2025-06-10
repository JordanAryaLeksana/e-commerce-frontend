import { configureStore } from '@reduxjs/toolkit';
import topupReducer from './slice/topupSlice';
import itemsReducer from './slice/itemsSlice';
import booleanReducer from './slice/booleanSlice';
import detailSlice from './slice/itemsDetail';
import colaboratorSlice from './slice/collabsSlice';
import authReducer from './slice/authSlice';
import cartReducer from './slice/cartSlice';
import quantityReducer from './slice/quantitySlice';
export const store = configureStore({
    reducer:{
        topup : topupReducer,
        items: itemsReducer,
        boolean: booleanReducer,
        detail: detailSlice,
        colaborators: colaboratorSlice,
        auth: authReducer,
        cart: cartReducer,
        quantity: quantityReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;