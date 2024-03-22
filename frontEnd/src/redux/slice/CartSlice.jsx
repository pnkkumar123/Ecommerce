import { createSlice } from '@reduxjs/toolkit';
import { fetchCartItems } from './CartAction';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload); 
        },
        removeFromCart: (state, action) => {
            return state.filter(item => item._id !== action.payload);
        },
        clearCart: () => {
            return [];
        }
    },
    extraReducers:builder =>{
        builder.addCase(fetchCartItems.fulfilled,(state,action)=>{
            return action.payload;
        })
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const selectCartItems = state => state.cart;
export default cartSlice.reducer;
