import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { RootState } from "../store";

export const apiSlice = createApi({
  reducerPath: "api",
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api`,

    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = (getState() as RootState).auth.jwt;
      const publicEndpoints = ["getProducts", "getProductById"];
      if (token && !publicEndpoints.includes(endpoint)) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Product"],

  endpoints: () => ({}),
});
