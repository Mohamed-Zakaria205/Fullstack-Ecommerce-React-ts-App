import type { IProduct } from "../../interfaces";
import { apiSlice } from "./api";
import qs from "qs";

interface IUpdateRequest {
  id: string;
  data: IProduct;
}
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
            fields: ["title", "stock", "price", "description"],
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

    updateProduct: build.mutation<void, IUpdateRequest>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),

      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productsApi.util.updateQueryData(
            "getDashboardProducts",
            id,
            (draft) => {
              Object.assign(draft, patch);
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Product"],
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetDashboardProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productsApi;
