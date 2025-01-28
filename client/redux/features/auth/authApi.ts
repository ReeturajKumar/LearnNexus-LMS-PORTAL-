/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";


type RegistrationResponse = {
  message: string;
  activationToken: string;
};


type RegistrationData = {
  activation_token: string;
  activation_code: string;
};


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
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: { email, password },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;

          dispatch(userLoggedIn({
            accessToken: result.data.accessToken,
            user: result.data.user,
          }));
        } catch (error:any) {
          console.log(error);
        }
      },
    }),

    socialAuth: builder.mutation({
      query: ({ email, name, avatar }) => ({
        url: "social-auth",
        method: "POST",
        body: { email, name, avatar },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          dispatch(userLoggedIn({
            accessToken: result.data.accessToken,
            user: result.data.user,
          }));
        } catch (error:any) {
          console.log(error);
        }
      },
    }),


    logOut: builder.query({
      query: () => ({
        url: "logout",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          dispatch(userLoggedOut());
        } catch (error:any) {
          console.log(error);
        }
      },
    }),
  }),
});


export const { useRegisterMutation,useActivationMutation,useLoginMutation,useSocialAuthMutation,useLogOutQuery } = authApi;