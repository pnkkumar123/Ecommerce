import {createSlice} from '@reduxjs/toolkit'

export const FilterSlice = createSlice({
    name:'filter',
    initialState:{
        selectedCategory:null
    },
    reducers:{
        setCategoryFilter:(state,action)=>{
            state.selectedCategory = action.payload;
        }
    }
})

export const {setCategoryFilter} = FilterSlice.actions
export const selectedCategoryFilter = state=>state.filter.selectedCategory
export default FilterSlice.reducer;