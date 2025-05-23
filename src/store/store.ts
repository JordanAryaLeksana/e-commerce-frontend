import { configureStore } from '@reduxjs/toolkit';
import topupReducer from './slice/topupSlice';
import itemsReducer from './slice/itemsSlice';
import booleanReducer from './slice/booleanSlice';
import detailSlice from './slice/itemsDetail';
export const store = configureStore({
    reducer:{
        topup : topupReducer,
        items: itemsReducer,
        boolean: booleanReducer,
        detail: detailSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;