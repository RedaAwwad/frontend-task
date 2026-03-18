import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/store/authSlice";
import profileReducer from "@/features/profile/store/profileSlice";
import productReducer from "@/features/products/store/productSlice";
import { productApi } from "@/features/products/store/productApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    product: productReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
