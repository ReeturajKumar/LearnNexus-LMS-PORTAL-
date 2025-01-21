/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { apiSlice } from "../api/apiSlice";
import { userRegistration } from "./authSlice";


type RegistrationResponse = {
  message: string;
  activationToken: string;
};


type RegistrationData = {};


export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          dispatch(userRegistration({
            token: result.data.activationToken
          }));
        } catch (error:any) {
          console.log(error);
        }
      },
    }),
    activation: builder.mutation<RegistrationResponse, RegistrationData>({
      query: ({activation_token, activation_code}) => ({
        url: "activate-user",
        method: "POST",
        body: {
          activation_token,
          activation_code
        }
      }),
    })
  }),
});


export const { useRegisterMutation,useActivationMutation } = authApi;