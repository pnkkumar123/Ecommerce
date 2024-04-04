import React from 'react';
import { useParams,useNavigate,Link } from 'react-router-dom';
import { useGetProductIdQuery } from '../redux/slice/ProductSlice';
import styled from 'styled-components'
import {Button} from '@mui/material'
import { FaMinus,FaPlus } from 'react-icons/fa';
import { setDecrease, setIncrease } from '../redux/slice/CartSlice';

function SinglePage() {
    const { productId } = useParams();
    const navigate = useNavigate()
    const { data, error, isLoading } = useGetProductIdQuery(productId);
console.log(data);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No product found</div>;

    const { brand, category, color, description, photo, price, productName, quantityAvailable, size,_id } = data.product;
console.log(data);
    return (
        <Wrapper>
            <div className="image">
            <img src={photo} alt={productName} />
            </div>
            <div className="product-data">
            <h2>{productName}</h2>
            <h4 >Price: ${price}</h4>
            <h4>Brand: {brand}</h4>
            <p>Category: {category}</p>
            <p>Color: {color}</p>
            <p>Quantity Available: {quantityAvailable}</p>
            <p>Size: {size}</p>
            <p>Description: {description}</p>
            
            </div>
            
            
        </Wrapper>
    );
}
const Wrapper = styled.section`
align-items:center;
justify-items:center;
display:flex;
margin-right:30vh;

.image{
    // border:1px solid black
   
    
    
}
.image img{
    height:350px;
    object-fit:contain
    width:250px;
    margin-top:80px;
    border-radius:10px;
    
}
.quantity{
  margin-top:80px;
  display:flex;
  flex-direction:row;
  margin:auto
  
}
.Cart{
  margin:auto;
  display:flex;
  justify-items:center;
  align-items:center;
  margin-top:400px
}
.Cart button{
  padding: 0 20px 10px 10px; 
  background-color:lightblue
  align-items:center;
  text-align:center
  margin:auto;
  border-radius:6px;
}
.Cart button:hover{
  cursor:pointer;
  background-color:blue;
  
}
.quantity input{
  width:30px;
  padding0 10px 15px 0;
}
.product-data{
    margin-left:10vh;
    border:1px solid lightgreen
    width:250px
}

`
export default SinglePage;
