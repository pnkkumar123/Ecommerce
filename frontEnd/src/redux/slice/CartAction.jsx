import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchCartItems = createAsyncThunk(
    'cart/fetchCartItems',
    async(userId,thunkAPI)=>{
        try{
            const response = await fetch(`http:localhost:5000/consumer/add-to-cart/${userId}`);
            if(response.ok){
                throw new Error('failed to fetch cart items')
            }
            const data = await response.json();
            return data.cartItems;
        }catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)