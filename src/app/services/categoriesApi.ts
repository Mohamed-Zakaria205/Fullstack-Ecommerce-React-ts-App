import { apiSlice } from "./api";
import qs from "qs";

export const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => {
        const queryString = qs.stringify(
          {
            fields: ["title", "documentId"],
          },
          { encodeValuesOnly: true },
        );

        return `/categories?${queryString}`;
      },
      providesTags: ["Category"],
    }),
  }),
});
export const { useGetCategoriesQuery } = categoriesApi;
