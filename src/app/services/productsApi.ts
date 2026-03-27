import { apiSlice } from "./api";
import qs from "qs";
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

    getDashboardProducts: build.query({
      query: () => {
        const queryString = qs.stringify(
          {
            populate: ["category", "thumbnail"],
            fields: ["title", "stock", "price"],
            pagination: {
              pageSize: 10,
              page: 1,
            },
          },
          { encodeValuesOnly: true },
        );

        return `/products?${queryString}`;
      },
      providesTags: ["Product"],
    }),

    deleteProduct: build.mutation<void, string>({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetDashboardProductsQuery,
  useDeleteProductMutation,
} = productsApi;
