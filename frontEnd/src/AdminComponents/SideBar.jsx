import React from 'react';
import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom';
import { CiHome } from "react-icons/ci";
import { RiUploadCloudLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { FaStore } from "react-icons/fa";


function SideBar() {
  

  return (
    <Wrapper>
      <div className="main">
          <div className="links">
            <NavLink to='/dashboard'>Dashboard <CiHome /></NavLink>
            <NavLink to='/uploadproducts'>Upload-Product <RiUploadCloudLine /> </NavLink>
            <NavLink to='/profile'>Profile <CgProfile /></NavLink>
            <NavLink to='/products'>Products <FaStore /></NavLink>
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
.links:hover{
  cursor:pointer;
  transform:transition (105%)
}
`
export default SideBar;
