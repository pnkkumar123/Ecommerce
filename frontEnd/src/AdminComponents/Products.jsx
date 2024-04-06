import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

import { useGetProductQuery,useDeleteProductMutation, useGetProductIdQuery, useGetSellerProductQuery } from '../redux/slice/ProductSlice';
import { Grid, Card, CardMedia, CardContent, Typography, Button, Chip } from '@mui/material';
import {useSelector} from 'react-redux'
import styled from 'styled-components';

function Products() {
    
    const id = useSelector((state)=>state?.user?.currentUser?._id)
    const {data,isFetching,error,refetch} = useGetSellerProductQuery(id)
  
    const navigate = useNavigate();
   
    const [deleteProduct] = useDeleteProductMutation();
  
   
   const handleDelete = (productId)=>{
    deleteProduct(productId)
    .unwrap()
    .then(()=>{
        console.log("product deleted successfully");
        navigate(`/products/${id}`)
        refetch()

    })
    .catch((error)=>{
        console.log("error deleting product:");
    })
   }
   
//    useEffect used for refetching data after completion of delete operation
   useEffect(()=>{
 
    refetch()
 
   },[refetch])
   
    if (isFetching) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data || !data.products || data.products.length === 0) {
        return <div>No products available</div>;
    }

    return (
        <ProductsContainer>
           <div className="title">
           <h2>Products</h2>
           </div>
           <Content>
           <Grid   container spacing={2} alignItems="stretch">
                {data.products.map((product) => {
                    console.log(product);
                    const {_id, productName, photo, description, price, category, brand, quantityAvailable, color, size } = product;
                    return (
                        <Grid  item xs={12} sm={6} md={3} key={product._id}>
                         
                            <ProductCard >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={photo ? photo : "https://img.freepik.com/free-vector/flat-design-no-data-illustration_23-2150527130.jpg?w=740&t=st=1710335455~exp=1710336055~hmac=856ef2a2e754625212837ec6499c88f1a50e2bad53016ba349817b5fa34f1af5"}
                                    alt={productName}
                                />
                             
                                    <Typography variant='h6' component="div">
                                        {productName}
                                    </Typography>
                                    <Typography variant='subtitle1' color="text.secondary">
                                        Price: ${price}
                                    </Typography>
                                    <Typography variant='body2' color="text.secondary">
                                        Description: {description ? (description.length > 90 ? `${description.slice(0, 90)}...` : description) : 'No description available'}
                                    </Typography>
                                    <Typography variant='body2' color="text.secondary">
                                        Category: {category}
                                    </Typography>
                                    <Typography variant='body2' color="text.secondary">
                                        Brand: {brand}
                                    </Typography>
                                    <Typography variant='body2' color="text.secondary">
                                        Quantity Available: {quantityAvailable}
                                    </Typography>
                                    <Typography variant='body2' color="text.secondary">
                                        Color: <Chip label={color} style={{ backgroundColor: color, color: 'white' }} />
                                    </Typography>
                                    <Typography variant='body2' color="text.secondary">
                                        Size: {size}
                                    </Typography>
                                   
                                  
                                    <Button onClick={()=>handleDelete(_id)} variant='contained' color='primary'>
                                     Delete
                                    </Button>
                                  
    <Link  to={`/products/${_id}/updateproduct`}>
     <StyleButton>Update</StyleButton>
    </Link>
 
                                
                            </ProductCard>
                          
                        </Grid>
                    );
                })}
            </Grid>
           </Content>
        </ProductsContainer>
    );
}

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the items horizontally */
  padding-top: 20px; /* Add padding to the top */
  
  .title {
    margin-bottom: 20px; /* Add margin bottom to create space between title and content */
  }
`;
const StyleButton = styled.button`
color:black;
width:100%;
background-color:orange;
padding:8px;
text-align:center;
border-radius:5px;

&:hover{
    background-color: red;
    cursor:pointer;
}

`
const Content = styled.div`
flex:1;
padding:20px;

`
const ProductCard = styled.div`
display:flex;
flex-direction:column;
margin-bottom:20px;
border:1px solid #ddd;
border-radius:5px;
padding:10px;
`;
const ProductImage = styled.img`
width:100%;
height:200px;
object-fit:cover;
border-radius:5px
`

export default Products;
