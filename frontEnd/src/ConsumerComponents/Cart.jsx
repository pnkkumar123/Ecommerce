import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useClearCartMutation, useDeleteCartMutation, useGetCartQuery } from '../redux/slice/ProductSlice';
import { updateCartTotalItem, updateCartTotalPrice } from '../redux/slice/CartSlice';
import { FaMinus, FaPlus, FaShoppingBag, FaTrash } from 'react-icons/fa';
import CartAmountToggle from './CartAmountToggle';
import FormatPrice from '../Components/FormatPrice';


function Cart() {
  const dispatch = useDispatch();
 
  const userId = useSelector((state) => state?.user?.currentUser?.user?._id);
  console.log(userId)
  const { data, isFetching, error, refetch } = useGetCartQuery(userId);
  const [deleteProduct] = useDeleteCartMutation();
  const [clearCart] = useClearCartMutation();
  const [grandTotal, setGrandTotal] = useState(0);
  
  const handleDelete = (itemId) => {
    deleteProduct({ userId, itemId }) // Pass userId and itemId to the delete function
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
    <>
      <div>
        {/* Your cart rendering logic */}
        {
          data?.cart?.items && data?.cart?.items.map((item) => {
            console.log(item)
           
    
            // Access the quantity from the productId object
            const validQuantity = item?.productId?.quantity ? item?.productId?.quantity : item?.quantity || 1;
        
            // Ensure price is a valid number, otherwise default to 0
            const validPrice = item?.productId?.price ? item?.productId?.price : item?.price
        
            // Calculate total
            const total = validQuantity * validPrice;
            return (
              <div className='cart_heading grid grid-five-column' key={item._id}>
               
                <div>
                  <p>{item?.productName ? item?.productName : item?.productId?.productName}</p>
                  <FaTrash className="remove_icon" onClick={() => handleDelete(item._id)} /> 
                </div>
                <div className="total">
                  <p>{total}</p>
                </div>
              </div>
            );
          })
        }
        <button onClick={handleClearCart}>{data?.cart?.items?.length === 0 ? 'No Items Left' : 'Clear Cart'}</button>
        <FaShoppingBag/>
        Continue shopping
      </div>
      <div className="grandTotal">
        <p>grandTotal {grandTotal}</p>
      </div>
      {/* Other parts of your cart UI */}
    </>
  );
}

export default Cart;



