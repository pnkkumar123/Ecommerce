import React from 'react';
import { useGetProductQuery } from '../redux/slice/ProductSlice';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/slice/CartSlice';

function ConsumerProducts() {
  const currentUser = useSelector((state) => state.user.currentUser.user._id);
  const dispatch = useDispatch();
  const { data, isFetching, error } = useGetProductQuery();

  const handleAddToCart = async (productId, productName, price, photo) => {
    try {
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

  if (isFetching) return <p>Loading...</p>;
  if (error) return <p>Error..</p>;
  if (!data || !data.products || data.products.length === 0) return <p>No products found</p>;

  return (
    <div className='products'>
      <h1>Products</h1>
      <Grid container spacing={2} alignItems="stretch">
        {data.products.map((product) => {
          const { _id, photo, description, productName, price, category, brand, quantityAvailable } = product;
          return (
            <Grid item xs={12} sm={6} md={3} key={_id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={photo ? photo : "https://img.freepik.com/free-vector/flat-design-no-data-illustration_23-2150527130.jpg?w=740&t=st=1710335455~exp=1710336055~hmac=856ef2a2e754625212837ec6499c88f1a50e2bad53016ba349817b5fa34f1af5"}
                  alt={productName}
                />
                <CardContent>
                  <Typography variant='h6' component="div" >
                    {productName}
                  </Typography>
                  <Typography variant='subtitle1' color="text.secondary">
                    Price: ${price}
                  </Typography>
                  <Typography variant='body2' color="text.secondary">
                    Description: {description ? (description.length > 90 ? `${description.slice(0, 50)}...` : description) : 'No description available'}
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
                  <Button variant='contained' color='primary' onClick={() => handleAddToCart(_id, productName, price, photo)}>Add to Cart</Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default ConsumerProducts;

