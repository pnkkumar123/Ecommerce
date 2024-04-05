import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const ProductApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${window.location.origin}` }),
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => 'createProduct/consumerproducts'
    }),
    getSellerProduct: builder.query({
      query: (id) => `createProduct/products/${id}`
    }),
    getCart: builder.query({
      query: (userId) => `consumer/cart/${userId}`
    }),
    getProductId: builder.query({
      query: (productId) => `createProduct/consumerproducts/${productId}`
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `createProduct/products/${productId}`,
        method: 'DELETE'
      })
    }),
    deleteCart: builder.mutation({
      query: ({ userId, itemId }) => ({
        url: `consumer/cart/${userId}/${itemId}`,
        method: 'DELETE'
      })
    }),
    clearCart: builder.mutation({
      query: ({ userId }) => ({
        url: `clear-cart/${userId}`,
        method: 'DELETE',
        
      })
    }),
    updateProduct: builder.mutation({
      query: ({ productId, formData, userId }) => ({
        url: `createProduct/products/${productId}`,
        method: 'PUT',
        body: { ...formData, userId }
      })
    }),
  })
});

export const {
  useGetProductQuery,
  useGetSellerProductQuery,
  useGetCartQuery,
  useGetProductIdQuery,
  useClearCartMutation,
  useDeleteProductMutation,
  useDeleteCartMutation,
  useUpdateProductMutation
} = ProductApi;

export { ProductApi };
