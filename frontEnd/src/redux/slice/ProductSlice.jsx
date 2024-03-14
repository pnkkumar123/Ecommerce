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
        })
    })

})
export const {useGetProductQuery,useGetProductIdQuery} = ProductApi;

export {ProductApi};