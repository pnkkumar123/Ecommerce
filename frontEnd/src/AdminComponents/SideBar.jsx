import React from 'react';
import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom';
import { CiHome } from "react-icons/ci";
import { RiUploadCloudLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { FaStore } from "react-icons/fa";
import {useSelector} from 'react-redux';

function SideBar() {
  const id = useSelector((state)=>state?.user?.currentUser?._id)

  return (
    <Wrapper>
      <div className="main">
          <div className="links">
            <NavLink to='/dashboard'>Dashboard <CiHome /></NavLink>
            <li>
            <Link to={`/uploadproducts/${id}`}>Upload Products</Link>
        </li>
            <NavLink to='/profile'>Profile <CgProfile /></NavLink>
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
