import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getProducts: builder.query<any, { limit?: number; skip?: number }>({
      query: ({ limit = 12, skip = 0 }) =>
        `products?limit=${limit}&skip=${skip}`,
    }),
    searchProducts: builder.query<
      any,
      { q: string; limit?: number; skip?: number }
    >({
      query: ({ q, limit = 12, skip = 0 }) =>
        `products/search?q=${q}&limit=${limit}&skip=${skip}`,
    }),
    getProductsByCategory: builder.query<
      any,
      { category: string; limit?: number; skip?: number }
    >({
      query: ({ category, limit = 12, skip = 0 }) =>
        `products/category/${category}?limit=${limit}&skip=${skip}`,
    }),
    getCategories: builder.query<any, void>({
      query: () => "products/categories",
    }),
  }),
});

export const {
  useGetProductsQuery,
  useSearchProductsQuery,
  useGetProductsByCategoryQuery,
  useGetCategoriesQuery,
} = productApi;
