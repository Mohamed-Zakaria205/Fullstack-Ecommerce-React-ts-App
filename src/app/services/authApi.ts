import type { IUser } from "../../interfaces";
import { apiSlice } from "./api";

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface AuthResponse {
  user: IUser;
  jwt: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials: LoginRequest) => ({
        url: "/auth/local",
        method: "POST",
        body: credentials,
      }),
    }),
  }),

  overrideExisting: false,
});

export const { useLoginMutation } = authApi;
