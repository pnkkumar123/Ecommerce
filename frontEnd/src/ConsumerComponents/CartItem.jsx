import React from 'react';
import { FaTrash } from 'react-icons/fa';
import CartAmountToggle from './CartAmountToggle';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, setDecrease, setIncrease } from '../redux/slice/CartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart({ productId }));
  };

  const handleDecrease = (productId) => {
    dispatch(setDecrease({ productId }));
  };

  const handleIncrease = (productId) => {
    dispatch(setIncrease({ productId }));
  };

  return (
    <div className='cart-heading'>
      <div className="cart-image">
        <figure>
          <img src={item.photo} alt={item.productName} />
        </figure>
      </div>
      <div>
        <p>{item.productName}</p>
      </div>
      <div className="cart-hide">
        <p>{item.price}</p>
      </div>
      <CartAmountToggle
        amount={item.price}
        setDecrease={() => handleDecrease(item._id)}
        setIncrease={() => handleIncrease(item._id)}
      />
      <div className="subtotal">
        <p>{item.price}</p>
      </div>
      <div><FaTrash onClick={() => handleRemoveFromCart(item._id)} /></div>
    </div>
  );
};

export default CartItem;
