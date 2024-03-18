import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import {useSelector} from 'react-redux'


function Navbar() {
  const {currentUser} = useSelector((state)=>state.user)
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
          {currentUser ? <span>
              signout
            </span> :  <NavLink to='/signin'>
                Log in
            </NavLink>}    
           
           
         </div>
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