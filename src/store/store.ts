import { configureStore } from '@reduxjs/toolkit';
import topupReducer from './slice/topupSlice';
import itemsReducer from './slice/itemsSlice';
export const store = configureStore({
    reducer:{
        topup : topupReducer,
        items: itemsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;