import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define an async thunk action to fetch cart details
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (userId, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:5000/consumer/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }
      const cartData = await response.json();
      return cartData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const { productId, productName, price, photo } = action.payload;
      const existingItem = state.cart.items.find(item => item.productId === productId);
      
    },
    removeFromCart: (state, action) => {
      const { productId } = action.payload;
      state.cart = state.cart.items.filter(item => item.productId !== productId);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers(builder) { 
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload; 
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
