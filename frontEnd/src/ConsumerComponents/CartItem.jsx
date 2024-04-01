import React from 'react'
import FormatPrice from './FormatPrice'

import { FaTrash } from 'react-icons/fa'
import { useCartContext } from './cartContext'
import CartAmountToggle from './CartAmountToggle'
import { useGetCartQuery } from '../redux/slice/ProductSlice'

const CartItem = () => {
  const id = useSelector((state)=>state?.user?.currentUser?.user?._id)

  const {data,isFetching,error} = useGetCartQuery(id)
  console.log(data) 
    
    
    
    


    return ( 
    <div className='cart_heading grid grid-five-column'>
        <div className="cart-image--name">
            <div>
                <figure>
                    <img src={image} alt={id} />
                </figure>
            </div>
            <div>
                <p>{name}</p>
                <div className='color-div'>
                    <p>Color:</p>
                    <div className='color-style' style={{backgroundColor:color,color:color}}></div>
                </div>
            </div>
        </div>
        {/* price */}
        <div className='cart-hide'>
            <p>
                <FormatPrice price={price}/>
            </p>
        </div>
        {/* quantity */}
       
            <CartAmountToggle
            amount={amount}
            setDecrease={()=>setDecrease(id)}
            setIncrease={()=>setIncrease(id)}
           
            />

            {/* subtotal */}
            <div className="cart-hide">
                <p><FormatPrice price={price*amount}/></p>
            </div>
            <div>
            <FaTrash className="remove_icon" onClick={()=>removeItem(id)}/>
            </div>
        

    </div>
    )
}

export default CartItem;