import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const ProductApi = createApi({
    reducerPath: 'productApi',
    baseQuery:fetchBaseQuery({baseUrl: 'http://localhost:5000/'}),
    endpoints:(builder)=>({
        getProduct:builder.query({
            query: ()=> 'createProduct/products'
        }),
        getProductId:builder.query({
            query:(productId)=>`createProduct/products/${productId}`
        }),
        deleteProduct:builder.mutation({
            query:productId=>({
                 url:`createProduct/products/${productId}`,
                 method:'DELETE'
            })
        })
    })

})
export const {useGetProductQuery,useGetProductIdQuery,useDeleteProductMutation} = ProductApi;

export {ProductApi};