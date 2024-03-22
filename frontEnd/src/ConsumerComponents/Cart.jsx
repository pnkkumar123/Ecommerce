import React, { useEffect } from 'react'
import { clearCart, removeFromCart } from '../redux/slice/CartSlice'
import {useSelector,useDispatch} from 'react-redux';
import {Button,Typography,List,ListItem,ListItemText,ListItemSecondaryAction,IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import { fetchCartItems } from '../redux/slice/CartAction';


function Cart() {
  const currentUser = useSelector((state)=>state.user);
  const cartItems = useSelector(state=>state.cart);
  console.log(cartItems);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(currentUser.id){
      dispatch(fetchCartItems(currentUser.id))
    }
  },[dispatch,currentUser.id])
  
  const handleRemoveFromCart = async (productId)=>{
   try{
    dispatch(removeFromCart(productId));
    const response = await  fetch("http://localhost:5000/consumer/remove-from-cart",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({userId:currentUser.id,productId}),
    })
    .then(response=>{
      if(response.ok){
        console.log("product remove  from cart");
      }else{
        console.log("failed to remove products from cart");
      }
    })
   }catch(e){
    console.log(e);
   }
  }
const handleClearCart = async ()=>{
try{
  dispatch(clearCart());
  const response = await fetch("http://localhost:5000/consumer/clear-from-cart",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({userId:currentUser.id}),
  })
  .then(response=>{
    if(response.ok){
      console.log('cart cleared successfully');
    }else{
      console.error('failed to clear cart');
    }
  })
}catch(e){
  console.log(e);
}

}



  return (
    <div style={{maxWidth:600,margin:'auto'}}>
      <Typography variant='h4' gutterBottom>
        Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant='body1'>
          Your Cart is empty.
        </Typography>
      ):(
        <List>
          {
           cartItems.cart && cartItems.cart.map(item =>(
              <ListItem key={item.id}>
                <ListItemText
                primary={item.name}
                secondary={`Quantity: ${item.quantity},Price:$${item.price}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label='delete' onClick={()=>handleRemoveFromCart(item._id)}>
                  <DeleteIcon/>

                </IconButton>

              </ListItemSecondaryAction>
                </ListItem>
            ))
          }
        </List>
      )}
       <Button variant='contained' color='secondary' onClick={handleClearCart}></Button>
    </div>
  )
}

export default Cart