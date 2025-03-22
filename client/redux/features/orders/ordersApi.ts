import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: "get-orders",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {useGetOrdersQuery} = ordersApi