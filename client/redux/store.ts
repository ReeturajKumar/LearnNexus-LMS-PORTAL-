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

//calling load user in page reload
const inializeApp = async () => {

  await store.dispatch(apiSlice.endpoints.loadeUser.initiate({},{
        forceRefetch: true,
      }
    )
  );
};

inializeApp();
