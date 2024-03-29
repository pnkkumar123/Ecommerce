import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const ProductApi = createApi({
    reducerPath: 'productApi',
    baseQuery:fetchBaseQuery({baseUrl: 'http://localhost:5000/'}),
    endpoints:(builder)=>({
        getProduct:builder.query({
            query: ()=> 'createProduct/consumerproducts'
        }),
        getSellerProduct:builder.query({
            query:(id)=>`createProduct/products/${id}`
        }),
        getCart: builder.query({
            query: (id) => `consumer/cart/${id}`
        }),
        
        getProductId:builder.query({
            query:(productId)=>`createProduct/consumerproducts/${productId}`,
           
        }),
       
        deleteProduct:builder.mutation({
            query:productId=>({
                 url:`createProduct/products/${productId}`,
                 method:'DELETE'
            })
        }),
        updateProduct: builder.mutation({
            query: ({ productId, formData, userId }) => ({
                url: `createProduct/products/${productId}`,
                method: 'PUT',
                body: { ...formData, userId }, 
            }),
        }),
    })

})
export const {useGetProductQuery,useGetSellerProductQuery,useGetCartQuery,useGetProductIdQuery,useDeleteProductMutation,useUpdateProductMutation} = ProductApi;

export {ProductApi};