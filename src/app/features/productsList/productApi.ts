import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337/api" }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => `/products?fields=title,stock,description,price`,
    }),
  }),
});
export const { useGetProductsQuery } = productApi;
