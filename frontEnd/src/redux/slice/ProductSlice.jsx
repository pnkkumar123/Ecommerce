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
        }),
        updateProduct:builder.mutation({
            query:({productId,formData})=>({
              url:`createProduct/products/${productId}`,
              method:'PUT',
              body:formData
            })
        })
    })

})
export const {useGetProductQuery,useGetProductIdQuery,useDeleteProductMutation,useUpdateProductMutation} = ProductApi;

export {ProductApi};