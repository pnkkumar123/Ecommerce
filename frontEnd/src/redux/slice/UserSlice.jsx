import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentUser:null,
   isSeller :false,
    loading:false,
    error:false,
}
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setSeller :(state)=>{
            
        },
         ConsumerSignInStart:(state)=>{
            state.loading = true;
         
        },
        ConsumerSignInSuccess:(state,action)=>{
             state.currentUser = action.payload;
             state.loading = false;
             state.isSeller = false;
             state.error = false;
        },
        ConsumerSignInFailure :(state,action)=>{
             state.error = action.payload;
             state.loading = false;
        },
        SellerSignInStart:(state)=>{
            state.loading = true;
        },
        SellerSignInSuccess:(state,action)=>{
            state.currentUser = action.payload;
            state.isSeller = true;
            state.loading = false;

            state.error = false;
        },
        SellerSignInFailure : (state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        signOutStart:(state)=>{
            state.loading = true;

        },
        signOutSuccess: (state)=>{
            state.currentUser=null;
            state.loading = false;
            state.error = null;
        },
        signOutFailure:(state,action)=>{
             
              state.error = action.payload;
              state.error = null;
        }
    }
})
export const {ConsumerSignInFailure,ConsumerSignInStart,ConsumerSignInSuccess,SellerSignInFailure,SellerSignInStart,SellerSignInSuccess,signOutFailure,signOutStart,signOutSuccess} = userSlice.actions;

export default userSlice.reducer;