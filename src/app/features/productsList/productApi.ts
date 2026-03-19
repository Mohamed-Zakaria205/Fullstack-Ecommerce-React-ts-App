import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api`,
  }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: () =>
        `/products?populate=thumbnail&fields=title,stock,description,price`,
    }),

    getProductById: build.query({
      query: (id: string) =>
        `/products/${id}?populate=thumbnail&fields=title,stock,description,price`,
    }),
  }),
});
export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
