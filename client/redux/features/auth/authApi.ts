/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";
import { userRegistration } from "./authSlider";

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = Record<string, any>; // Assuming registration data can be any object

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "registration",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(userRegistration({ token: result.data.activationToken }));
        } catch (error) {
          console.error(error);
        }
      },
    }),

    activation: builder.mutation<{ message: string }, { activation_token: string; activation_code: string }>(
      {
        query: ({ activation_token, activation_code }) => ({
          url: "activate-user",
          method: "POST",
          body: { activation_token, activation_code },
        }),
      }
    ),
  }),
});

export const { useRegisterMutation, useActivationMutation } = authApi;
