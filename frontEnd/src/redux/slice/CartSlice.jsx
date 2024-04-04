import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
    items: [], 
    status: 'idle',
    totalItem: 0,
    totalPrice: 0,
    error: null,
  },
  reducers: {
    updateCartTotalItem(state) {
      state.totalItem = state.items.reduce((accum, curItem) => accum + curItem.amount, 0);
    },
    updateCartTotalPrice(state) {
      state.totalPrice = state.items.reduce((accum, curElem) => accum + curElem.price * curElem.amount, 0);
    },
    addToCart(state, action) {
      const { productId, productName, price, photo } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.productId === productId);
      if (existingItemIndex !== -1) {
      
        state.items[existingItemIndex].quantity += 1;
      } else {
       
        state.items.push({ productId, productName, price, photo, quantity: 1 });
      }
    },
    updateCartItemQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const itemIndex = state.items.findIndex(item => item.productId === productId);
      if (itemIndex !== -1) {
        state.items[itemIndex].quantity = quantity;
      }
    },
    setDecrease(state, action) {
      const productId = action.payload;
      const item = state.items.find(item => item.id === productId);

      if (item) {
        item.amount = Math.max(item.amount - 1, 1);
      }
      state.totalItem = state.items.reduce((accum, curItem) => accum + curItem.amount, 0);
      state.totalPrice = state.items.reduce((accum, curElem) => accum + curElem.price * curElem.amount, 0);
    },
    setIncrease(state, action) {
      const productId = action.payload;
      const item = state.items.find(item => item.id === productId);

      if (item) {
        item.amount = Math.min(item.amount + 1, item.max);
      }
      state.totalItem = state.items.reduce((accum, curItem) => accum + curItem.amount, 0);
      state.totalPrice = state.items.reduce((accum, curElem) => accum + curElem.price * curElem.amount, 0);
    },
    removeFromCart(state, action) {
      const productId = action.payload;
  
      if (state.cart && state.cart.items) {
        state.cart.items = state.cart.items.filter(item => item.id !== productId);
        
        state.totalItem = state.cart.items.reduce((accum, curItem) => accum + curItem.amount, 0);
        state.totalPrice = state.cart.items.reduce((accum, curElem) => accum + curElem.price * curElem.amount, 0);
      }
    },
    
    clearCart(state) {
      state.cart = [];
      state.totalItem = 0;
      state.totalPrice = 0;
    },
    getTotal(state, action) {
      let { total, quantity } = state.items.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0
        }
      );
      state.totalItem = quantity;
      state.totalPrice = total;
    }
  },
  extraReducers(builder) { 
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items; 
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addToCart, getTotal, updateCartItemQuantity, updateCartTotalItem, updateCartTotalPrice, setIncrease, setDecrease, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

