import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useGetProductQuery } from '../redux/slice/ProductSlice';
import { Grid, Typography, Button } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/slice/CartSlice';
import Filters from './Filters';

function ConsumerProducts() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser?.user?._id);
  const dispatch = useDispatch();
  const { data, isFetching, error, refetch } = useGetProductQuery();
  
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    refetch(); // Refetch products when data changes (e.g., when new products are added)
  }, [refetch]);

  const categories = useMemo(() => {
    if (!data || !data.products || data.products.length === 0) return [];
    const uniqueCategories = [...new Set(data.products.map(product => product.category))];
    return uniqueCategories;
  }, [data]);

  const handleAddToCart = async (productId, productName, price, photo) => {
    try {
      if (!currentUser) {
        navigate('/consumersignin');
        return;
      }
      const userId = currentUser;
      dispatch(addToCart(productId));
      const response = await fetch("http://localhost:5000/consumer/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({ userId, productId, productName, price, photo }),
      });
      if (response.ok) {
        console.log("Product added to cart");
      } else {
        console.log('Failed to add product to cart');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
  };

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return data?.products || [];
    return data?.products.filter(product => product.category === selectedCategory) || [];
  }, [selectedCategory, data]);

  if (isFetching) return <p>Loading...</p>;
  if (error) return <p>Error..</p>;
  if (!data || !data.products || data.products.length === 0) return <p>No products found</p>;

  return (
    <ProductsContainer>
      <Sidebar>
       <Filters categories={categories} onCategoryClick={handleCategoryClick} onClearFilters={handleClearFilters} />
      </Sidebar>
      <Content>
        <Typography variant="h1">Products</Typography>
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <ProductCard>
                <ProductImage src={product.photo || "https://img.freepik.com/free-vector/flat-design-no-data-illustration_23-2150527130.jpg?w=740&t=st=1710335455~exp=1710336055~hmac=856ef2a2e754625212837ec6499c88f1a50e2bad53016ba349817b5fa34f1af5"} alt={product.productName} />
                <Typography variant='h6'>{product.productName}</Typography>
                <Typography variant='subtitle1'>Price: ${product.price}</Typography>
                <Typography variant='body2'>Category: {product.category}</Typography>
                <Typography variant='body2'>Brand: {product.brand}</Typography>
                <Typography variant='body2'>Quantity Available: {product.quantityAvailable}</Typography>
                {currentUser ? (
                  <Button variant='contained' color='primary' onClick={() => handleAddToCart(product._id, product.productName, product.price, product.photo)}>Add to Cart</Button>
                ) : (
                  <Button variant='contained' color='primary'>
                    <NavLink to='/consumersignin'>Add to Cart</NavLink>
                  </Button>
                )}
              </ProductCard>
            </Grid>
          ))}
        </Grid>
      </Content>
    </ProductsContainer>
  );
}

// Styled components...


const ProductsContainer = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  width: 250px;
  padding: 20px;
`;

const Content = styled.div`
  flex: 1;
  gap:50px
  padding: 20px;
`;

const ProductCard = styled.div`
  width: 200px; /* Set a fixed width for the product card */
  height: 300px; /* Set product card height to occupy available space */
  border: 1px solid #ddd;
  border-radius: 5px;

  padding: 10px;
  margin:40px;
  overflow:hidden;
  display: flex;
  flex-direction: column;
`;
const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  bottom:0 /* Set a fixed height for the product image */
  object-fit: cover;
  border-radius: 5px;
`;

export default ConsumerProducts;

