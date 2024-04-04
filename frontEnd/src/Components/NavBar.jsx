import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { signOutFailure, signOutStart, signOutSuccess } from '../redux/slice/UserSlice';
import { FaStore } from 'react-icons/fa';
import { CgSearch } from 'react-icons/cg';
// import { useGetCartQuery } from '../redux/slice/ProductSlice';


function Navbar() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
const id = currentUser?.user?._id;

  const isSeller = useSelector((state) => state.user.isSeller);
  const dispatch = useDispatch();
  const [isProductsHovered, setIsProductsHovered] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch('http://localhost:5000/seller/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess(data));
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  return (
    <Wrapper>
      <nav className='navbar'>
        <div className='navbar-left'>
          <Link to='/' className='navbar-logo'>
            Ecommerce
          </Link>
        </div>
        
        <div className='navbar-right'>
          <div className='links-here'>
            <ul>
            {currentUser && !isSeller && (
    <>
        <li
            onMouseEnter={() => setIsProfileHovered(true)}
            onMouseLeave={() => setIsProfileHovered(false)}>
            <NavLink to='/profile' style={{ color: isProfileHovered ? 'red' : 'white' }}>
                Profile
            </NavLink>
        </li>
        <li>
            <Link to={`/cart/${id}`}>Cart</Link>
        </li>
    </>
)}
              
            
            </ul>
          </div>
          <div className='user'>
            {currentUser ? (
              <span onClick={(e) => handleSignOut(e.target.value)}>signout</span>
            ) : (
              <NavLink to='/consumersignin'>Log in</NavLink>
            )}
          </div>
          <div className='seller'>
            {currentUser ? (
              <span>{currentUser.name}</span>
            ) : (
              <NavLink to='/signin'>
                Seller
                <FaStore />
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .navbar {
    background-color: #232f3e;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 60px;
  }

  .navbar-logo {
    color: #ffffff;
    text-decoration: none;
    font-size: 1.5rem;
  }

  .navbar-right {
    display: flex;
    align-items: center;
  }

  .links-here ul {
    display: flex;
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .links-here ul li {
    margin-right: 20px;
  }
  .search input{
    width:300px;
    border-radius:20px;
  }
  
  .links-here ul li:last-child {
    margin-right: 0;
  }

  .user,
  .seller {
    margin-left: 20px;
  }

  .user span {
    cursor: pointer;
  }
`;

export default Navbar;


