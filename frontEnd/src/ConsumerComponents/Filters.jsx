import React from 'react'
import styled from 'styled-components'
import {useSelector,useDispatch} from 'react-redux';
import { selectedCategoryFilter, setCategoryFilter } from '../redux/slice/FilterSlice';



function Filters({categories}) {
  const selectedCategory = useSelector(selectedCategoryFilter);
  const dispatch = useDispatch();

  const handleCategoryClick = (category)=>{
    dispatch(setCategoryFilter(category));
  };
  
  return (
    <div>
     {
       categories.map((category,index)=>(
        <button key={index} onClick={()=>handleCategoryClick(category)}>{category}</button>
       ))
     }

    </div>
  )
}


export default Filters