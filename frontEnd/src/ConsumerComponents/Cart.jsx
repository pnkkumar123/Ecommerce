
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useClearCartMutation, useDeleteCartMutation, useGetCartQuery } from '../redux/slice/ProductSlice';
import { Link } from 'react-router-dom';
import { FaMinus, FaPlus, FaShoppingBag, FaTrash } from 'react-icons/fa';
import {Button} from '@mui/material'
import { loadRazorpay } from './RazorPay/LoadPayment';


function Cart() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state?.user?.currentUser?.user?._id);
  const { data, isFetching, error, refetch } = useGetCartQuery(userId);
  const [deleteProduct] = useDeleteCartMutation();
  const [clearCart] = useClearCartMutation();
  const [grandTotal, setGrandTotal] = useState(0);

  const handleDelete = (itemId) => {
    deleteProduct({ userId, itemId })
      .unwrap()
      .then(() => {
        console.log("Product deleted successfully");
        console.log(data?.cart?.items)
        refetch();
      })
      .catch((error) => {
        console.log("Error deleting product:", error);
      });
  };

  const handleClearCart = () => {
    clearCart({ userId })
      .unwrap()
      .then(() => {
        console.log("Cart cleared successfully");
        refetch();
      })
      .catch((error) => {
        console.log("Error clearing cart:", error);
      });
  };
const buyNow = async()=>{
 loadRazorpay(grandTotal)

}
  useEffect(() => {
    if (data?.cart?.items) {
      let total = 0;
      data.cart.items.forEach((item) => {
        const validQuantity = item?.productId?.quantity || item?.quantity || 1;
        const validPrice = item?.productId?.price || item?.price || 0;
        const itemTotal = validQuantity * validPrice;
        total += itemTotal;
      });
      setGrandTotal(total);
    }
  }, [data]);

  useEffect(() => {
    refetch()
  }, [refetch]);

  

  if (isFetching) return <div>Loading...</div>;
  if (error) return <p>Error: {error.message}</p>;
  if (data?.cart?.items.length === 0) return <p>No Products Available</p>;

  return (
    <Wrapper>
  
    <div className="cart">
        <div className="title">
          <p>Name</p>
          <p>Quantity</p>
          <p>Price</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        {data?.cart?.items && data?.cart?.items.map((item) => {
          const validQuantity = item?.productId?.quantity ? item?.productId?.quantity : item?.quantity || 1;
          const validPrice = item?.productId?.price ? item?.productId?.price : item?.price
          const total = validQuantity * validPrice;
          return (
            <div className='card' key={item._id}>
              <div>{item?.productName ? item?.productName : item?.productId?.productName}</div>
              <div>{validQuantity}</div>
              <div className="price">{validPrice}</div>
              <div className="total">{total}</div>
              <div>
                <FaTrash className="remove_icon" onClick={() => handleDelete(item._id)} />
              </div>
            </div>
          );
        })}
        <div className="buttons">
          
       
        </div>
        <div className="continue-shopping">
          <Link to="/consumerproducts">
            <FaShoppingBag/>
            Continue shopping
          </Link>
        </div>
      </div>
      <div className="grandTotal">
        <p>Total : {grandTotal}</p>
        <Button className='button' onClick={buyNow}>Proceed to Pay</Button>
      </div>
 
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display:flex;
  flex-direction:row;

  .cart {
    margin-top:20px;
    height:auto;
    
    margin-right:30px;
    width: 800px;
    border: 1px solid black;
    border-radius: 10px;
    flex-direction:row;
    display:flex;
    flex-direction:column;
  }

  .title {
   
    width:100%;
    display:grid;
    grid-template-columns: repeat(5, 1fr);
    gap:10px;
    margin-bottom:10px;
    box-shadow:0 0 10px rgba(111, 222, 177, 0.3)
  }

  .card {
    display:grid;
    grid-template-columns: repeat(5, 1fr);
    gap:10px;
    margin-bottom:15px;
  
    
  }
.grandTotal {
  height:100px;
  width:200px;
  margin-top:20px;
  padding:20px;
  background-color: rgba(111,200,219,0.3);
  border:1px solid black;
  border-radius:10px;
}
.grandTotal p {
  margin:0;
  
}
.grandTotal .button{
  margin-top:60px;
  box-shadow : 10px rgba(111, 222, 177, 0.3);
  align-items:center;
}
  .price {
    grid-column: 3;
  }

  .buttons {
    
    padding-bottom: 20px; 
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    gap: 10px;
    margin-right: 10px;
  }
  .buttons .button {
    background-color: rgba(111, 200, 219, 0.3);
  }
  .card:hover {
   
   cursor:pointer
    }
  .continue-shopping {
    margin-top:150px;
    display:flex;
    align-items:center;
  }
 
`;

export default Cart;

