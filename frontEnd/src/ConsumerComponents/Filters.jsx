import React from 'react';
import styled from 'styled-components';

function Filters({ categories, onCategoryClick, onClearFilters }) {
  return (
    <div>
     
      <CategoryList>
        <Title>Category</Title>
        {categories.map((category, index) => (
          <CategoryButton  key={index} onClick={() => onCategoryClick(category)}>{category}</CategoryButton>
        ))}
      </CategoryList>
      <Button style={{padding:12,borderRadius:5}} onClick={() => onClearFilters()}>Clear Filters</Button>
    </div>
  );
}
const Title = styled.h5`
  font-size: bold;
  text-align: center; /* Center the text horizontally */
  margin-bottom: 10px; /* Add margin below the title */
`;

const CategoryButton = styled.button`
  margin-right: 10px;
  padding: 10px;
  margin-bottom: 10px; /* Add margin between buttons */
  width: 150px; /* Set a fixed width for the buttons */
`;
const Button = styled.button`
margin-right: 10px;
  margin-bottom: 10px;
`
const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the items horizontally */
  box-shadow: 0 0 10px rgba(111, 222, 177, 0.3);
  padding: 20px;
  margin-bottom: 20px; /* Add margin to create gap between Clear Filters and category buttons */
`;


export default Filters;

