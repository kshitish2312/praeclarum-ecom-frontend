import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../store/slices/authSlice';
import productSlice from '../store/slices/productSlice'

export const store = configureStore({
  reducer: {
    auth:authSlice,
    product:productSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
