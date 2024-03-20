import React from 'react'
import { useGetProductQuery } from '../redux/slice/ProductSlice'
import {Grid,Card,CardMedia,CardContent,Typography,Button,Chip} from '@mui/material'
import { Link } from 'react-router-dom';

function ConsumerProducts() {
  const {data,isFetching,error} = useGetProductQuery();
  
  if(isFetching)return <p>Loading...</p>;
  if(error) return <p>error..</p>
  if(!data || !data.products || data.products.length === 0  )return <p>""</p>
  return (
    <div>
      <div>
        
      </div>
    <h1>Products</h1>
    <Grid container spacing={2} alignItems="stretch">
      {data.products && data.products.map((product) => {
        const {_id, photo, description, productName, price, category, brand, quantityAvailable, color, size} = product;
        return (
          <Grid item xs={12} sm={6} md={3} key={_id}>
            <Link to={`/consumerproducts/${_id}`} style={{textDecoration:'none'}}>
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
                    Price:${price}
                  </Typography>
                  <Typography variant='body2' color="text.secondary">
                    Description : {description ? (description.length > 90 ? `${description.slice(0,50)}...` : description):'No description available'}
                  </Typography>
                  <Typography variant='body2' color="text.secondary">
                    Category:{category}
                  </Typography>
                  <Typography variant='body2' color="text.secondary">
                    Brand:{brand}
                  </Typography>
                  <Typography variant='body2' color="text.secondary">
                    Quantity Available: {quantityAvailable}
                  </Typography>
                   

                   <Button variant='contained' color='primary'>Add to Cart</Button>


                </CardContent>
                  
              
              </Card>
            </Link>
          </Grid>
        );
      })}
    </Grid>
  </div>
  
  )
}



export default ConsumerProducts