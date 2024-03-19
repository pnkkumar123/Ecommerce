import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import {useSelector,useDispatch} from 'react-redux'
import { signInFailure, signOutFailure,signOutStart,signOutSuccess } from '../redux/slice/UserSlice' 
import { FaStore } from "react-icons/fa";

function Navbar() {
  const {currentUser,loading,error} = useSelector((state)=>state.user)
  const dispatch = useDispatch(); 
  const handleSignOut = async()=>{
    try{
      dispatch(signOutStart())
      const res = await fetch('http://localhost:5000/seller/signout',{
        method:'POST'
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(signOutFailure(data.message))
        return;
      }
      dispatch(signOutSuccess(data))
    }catch(error){
      dispatch(signInFailure(error.message))
    }
   }
 
  return (
    <>
    <Wrapper>
    <nav className='navbar'>
         <div>
         <Link to='/' className='navbar-logo'>
            Ecommerce
         </Link>

         </div>
         <div className='user'>
          {currentUser ? <span onClick={(e)=>handleSignOut(e.target.value)}>
              signout
            </span> :  <NavLink to='/signin'>
                Log in
            </NavLink>}    
           
           
         </div>
         <div className='seller'>{currentUser ? <span>{currentUser.name}</span> :<NavLink to="/signin">Seller<FaStore /></NavLink> }</div>
    </nav>
    
        
    </Wrapper>
   
    </>
  )
}
const Wrapper = styled.section `
.navbar {
  height: 10vh;
  background: black;
  display: flex;
}
.seller{
  color:white;
}
.navbar-logo {
  color: white;
  text-decoration: none;
  font-size: 2rem;
  width: 10rem;
}

.user span {
  color: white;
}
`
export default Navbar