import React from 'react';
// import { useDispatch } from 'react-redux';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

// Import the fetchProduct action

import { useGetCartQuery } from '../redux/slice/ProductSlice';


function Cart() {
  const {data,isFetching,error} = useGetCartQuery()
  console.log(data);
 
  
  // const dispatch = useDispatch();

  if(isFetching)return <div>loading...</div>
  if(error)return <p>error{error}</p>
  

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      
        <List>
        {data.products && data.products.map(product => (
  <div key={product._id}>
    
    <List>
      {product.items && product.items.map((item) => {
        console.log(item);
        const { _id, productName, price, photo } = item;
        return (
          <ListItem key={_id}>
            <ListItemText primary={productName} secondary={`$${price}`} />
          </ListItem>
        );
      })}
    </List>
  </div>
))}


        </List>
     
    </div>
  );
}

export default Cart;
