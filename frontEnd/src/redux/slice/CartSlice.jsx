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
    items: [], // Changed from cart to items to simplify the state structure
    status: 'idle',
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const { productId, productName, price, photo } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.productId === productId);
      if (existingItemIndex !== -1) {
        // If product exists in the cart, update its quantity
        state.items[existingItemIndex].quantity += 1;
      } else {
        // If product doesn't exist, add it to the cart
        state.items.push({ productId, productName, price, photo, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const { productId } = action.payload;
      state.items = state.items.filter(item => item.productId !== productId);
    },
    clearCart: (state) => {
      state.items = [];
    },
    setIncrease:(state,action)=>{
      const {productId} = action.payload;
      const item = state.items.find(item=>item.productId === productId)
       if(item){
        item.quantity += 1;
       }
    } ,
    setDecrease :(state,action)=>{
      const {productId} = action.payload;
      const item = state.items.find(item=>item.productId === productId);
      if(item && item.quantity > 1){
        item.quantity -= 1;
      }
    } ,
  },
  extraReducers(builder) { 
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items; // Assuming the fetched data structure contains 'items' array
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addToCart, setIncrease,setDecrease,removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
