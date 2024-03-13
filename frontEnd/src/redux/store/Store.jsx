import { configureStore } from '@reduxjs/toolkit';
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductApi } from '../slice/ProductSlice'; // Import your API definition

const store = configureStore({
  reducer: {
    // Include the generated reducer from the API
    [ProductApi.reducerPath]: ProductApi.reducer,
  },
  // Include the middleware for API requests
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ProductApi.middleware),
});

export default store;

// Export any additional hooks or functions you might need
export const { useGetProductQuery } = ProductApi;

