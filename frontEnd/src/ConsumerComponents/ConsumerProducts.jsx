import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useGetProductQuery } from '../redux/slice/ProductSlice';
import { Grid, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/slice/CartSlice';
import Filters from './Filters';
import { FaMinus,FaPlus } from 'react-icons/fa';

function ConsumerProducts() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser?.user?._id);
  const dispatch = useDispatch();
  const { data, isFetching, error, refetch } = useGetProductQuery();
  const [quantities, setQuantities] = useState({}); 
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    refetch(); 
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
      const existingCartItem = data?.cart?.items.find(item => item.productId === productId);
      if (existingCartItem) {
        // If the item already exists in the cart, update its quantity
        dispatch(updateCartItemQuantity({ itemId: existingCartItem._id + productName, quantity: existingCartItem.quantity + 1 }));
      } else {
        dispatch(addToCart(productId));
      }
      const response = await fetch('/consumer/add-to-cart', {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({ userId, productId, productName, price, photo, quantity: quantities[productId] }),
      });
      if (response.ok) {
        console.log("Product added to cart");
      } else {
        // Handle error if needed
      }
    } catch (e) {
      console.log(e);
    }
  };

  const setDecrease = (productId) => {
    const updatedQuantity = Math.max(1, quantities[productId] - 1); // Ensure quantity doesn't go below 1
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: updatedQuantity
    }));
  };
  
  const setIncrease = (productId) => {
    const updatedQuantity = Math.min(data?.products?.quantityAvailable, quantities[productId] + 1); // Ensure quantity doesn't exceed available quantity
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: updatedQuantity
    }));
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
                <Link to={`/singlepage/${product._id}`} style={{textDecoration:"none"}}>
                  <ProductImage src={product.photo ? product.photo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdjSlKh-Tk7ADvbDpOnK1NJvPWogPd1QhUxg&usqp=CAU"} alt={product.productName} />
                  <Typography variant='h6'>{product.productName}</Typography>
                  <Typography variant='subtitle1'>Price: ${product.price}</Typography>
                 
                  <Typography variant='body2'>Brand: {product.brand}</Typography>
                </Link>
                <QuantityContainer>
  <button onClick={() => setDecrease(product._id)}>
    <FaMinus/>
  </button>
  <div className='amount-style'>
    {quantities[product._id] || 1} {/* Display current quantity for the specific product */}
  </div>
  <button onClick={() => setIncrease(product._id)}>
    <FaPlus/>
  </button>
</QuantityContainer>

                
                {currentUser ? (
                  <Button variant='contained' color='primary' onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                ) : (
                  <Link to='/consumersignin'><StyleButton>Add to Cart</StyleButton></Link>
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
const StyleButton = styled.button`
  color:white;
  background-color:blue;
  padding:8px;
  text-align:center;
  border-radius:5px;
`;

const ProductsContainer = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  width: 250px;
  padding: 20px;
`;

const Content = styled.div`
  flex: 1;
  gap:50px;
  padding: 20px;
`;

const ProductCard = styled.div`
  width: 200px;
  height: 300px;
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
  bottom:0;
  object-fit: cover;
  border-radius: 5px;
`;


const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0 5px;
`;

const QuantityInput = styled.input`
  width: 50px;
  text-align: center;
`;


export default ConsumerProducts;
