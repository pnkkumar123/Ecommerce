import React from 'react';
import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom';
import { CiHome } from "react-icons/ci";

import {useSelector} from 'react-redux';

function SideBar() {
  const id = useSelector((state)=>state?.user?.currentUser?._id)

  return (
    <Wrapper>
      <div className="main">
          <div className="links">
            <Link to='/dashboard'>Dashboard <CiHome /></Link>
            <li>
            <Link to={`/uploadproducts/${id}`}>Upload Products</Link>
        </li>
            
            <li>
            <Link to={`/products/${id}`}>Products</Link>
        </li>
          </div>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.section`
width:400px

.main{
  top:10vh;
  width:400pxpx;
  border-right:1px black solid
}
.links{
  display:flex;
  flex-direction:column;
  margin:20px;
  gap:30px;
  padding:0 10px 10px 18px;
}
.links  li{
  list-style:none;
}
.links:hover{
  cursor:pointer;
  transform:transition (105%)
}
`
export default SideBar;
