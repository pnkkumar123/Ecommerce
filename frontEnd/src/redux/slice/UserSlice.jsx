import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentUser:null,
    loading:false,
    error:false,
}
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading = true;
        },
        signInSuccess:(state,action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        signInFailure : (state,action)=>{
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
export const {signInFailure,signInStart,signInSuccess,signOutFailure,signOutStart,signOutSuccess} = userSlice.actions;

export default userSlice.reducer;