import { createSlice } from '@reduxjs/toolkit';

const uploadProductSlice = createSlice({
  name: 'uploadProduct',
  initialState: {
    products:[],
    status: 'idle',
    error: null,
  },
  reducers: {
    createProductSuccess: (state, action) => {
        const product = action.payload;
        state.products.push(product); // Add the new product to the state
        state.status = 'succeeded'; // Update the status
        state.error = null; // Clear any previous errors
    },
    createProductFailed: (state, action) => {
        state.status = 'failed'; // Update the status
        state.error = action.payload; // Set the error message
    },
  },
});

export const { createProductSuccess, createProductFailed } = uploadProductSlice.actions;

export default uploadProductSlice.reducer;

