"use client";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

//calling refresh token in page load
const inializeApp = async () => {
  await store.dispatch(
    apiSlice.endpoints.refreshToken.initiate(
      {},
      {
        forceRefetch: true,
      }
    )
  );

  await store.dispatch(
    apiSlice.endpoints.loadeUser.initiate(
      {},
      {
        forceRefetch: true,
      }
    )
  );
};

inializeApp();
