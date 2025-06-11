// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { combineReducers } from 'redux';

import topupReducer from './slice/topupSlice';
import itemsReducer from './slice/itemsSlice';
import booleanReducer from './slice/booleanSlice';
import detailSlice from './slice/itemsDetail';
import colaboratorSlice from './slice/collabsSlice';
import authReducer from './slice/authSlice';
import cartReducer from './slice/cartSlice';


const rootReducer = combineReducers({
  topup: topupReducer,
  items: itemsReducer,
  boolean: booleanReducer,
  detail: detailSlice,
  colaborators: colaboratorSlice,
  auth: authReducer,
  cart: cartReducer,

});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'auth'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // penting untuk redux-persist
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
