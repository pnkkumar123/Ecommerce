import React from 'react';
import { Link } from 'react-router-dom';
import { useGetProductQuery } from '../redux/slice/ProductSlice';
import { Grid, Card, CardMedia, CardContent, Typography, Button, Chip } from '@mui/material';

function Products() {
    const { data, isFetching, error } = useGetProductQuery();

    if (isFetching) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data || !data.products || data.products.length === 0) {
        return <div>No products available</div>;
    }

    return (
        <div>
            <h3>Products</h3>
            <Grid   container spacing={2} alignItems="stretch">
                {data.products.map((product) => {
                    console.log(product);
                    const {_id, productName, photo, description, price, category, brand, quantityAvailable, color, size } = product;
                    return (
                        <Grid  item xs={12} sm={6} md={3} key={product._id}>
                         <Link to={`/products/${product._id}`} style={{textDecoration:'none'}}>
                            <Card >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={photo ? photo : "https://img.freepik.com/free-vector/flat-design-no-data-illustration_23-2150527130.jpg?w=740&t=st=1710335455~exp=1710336055~hmac=856ef2a2e754625212837ec6499c88f1a50e2bad53016ba349817b5fa34f1af5"}
                                    alt={productName}
                                />
                                <CardContent>
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
                                    <Button variant='contained' color='primary'>
                                        Add To Cart
                                    </Button>
                                </CardContent>
                            </Card>
                            </Link>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}

export default Products;
