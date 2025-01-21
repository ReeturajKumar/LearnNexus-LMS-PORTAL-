/* eslint-disable @typescript-eslint/no-unused-vars */
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
    credentials: 'include',
  }),
  endpoints: (builder) => ({}),
});


export const {} = apiSlice;