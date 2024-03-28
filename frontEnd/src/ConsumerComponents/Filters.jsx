import React from 'react';
import styled from 'styled-components';

function Filters({ categories, onCategoryClick, onClearFilters }) {
  return (
    <div>
     
      <CategoryList>
        {categories.map((category, index) => (
          <Button key={index} onClick={() => onCategoryClick(category)}>{category}</Button>
        ))}
      </CategoryList>
      <Button style={{padding:12,borderRadius:5}} onClick={() => onClearFilters()}>Clear Filters</Button>
    </div>
  );
}

const Button = styled.button`
  margin-right: 10px;
  margin:20px;
  align-items:center;
  jutify-items:center;
  
`;


const CategoryList = styled.div`
box-shadow: 0 0 10px rgba(111, 222, 177, 0.3);
  margin-bottom: 20px; /* Add margin to create gap between Clear Filters and category buttons */
`;

export default Filters;

