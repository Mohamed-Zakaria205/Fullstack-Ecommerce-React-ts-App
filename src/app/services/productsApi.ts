import { apiSlice } from "./api";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () =>
        `/products?populate=thumbnail&fields=title,stock,description,price`,
      providesTags: ["Product"],
    }),

    getProductById: build.query({
      query: (id: string) =>
        `/products/${id}?populate=thumbnail&fields=title,stock,description,price`,
      providesTags: ["Product"],
    }),
  }),
});
export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
