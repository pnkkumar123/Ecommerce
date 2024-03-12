import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from '../slice/ProductSlice'; // Import your reducer(s) here

const store = configureStore({
  reducer: {
    product: ProductReducer, // Assuming ProductReducer is your reducer
    // Add other reducers if you have them
  },
  // Additional store configurations can be added here
});

export default store;
