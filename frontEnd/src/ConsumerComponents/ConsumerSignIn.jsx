import React, { useState } from "react";
import styled from 'styled-components';
import {
  ConsumerSignInFailure,
  ConsumerSignInStart,
  ConsumerSignInSuccess,
  
} from "../redux/slice/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

function ConsumerSignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };const handleGuestLogin = () => {
    
    setFormData({
      email: "guest@gmail.com",
      password: "pankaj"
    });

    // Submit the form
    handleSubmit();
  };
  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      dispatch(ConsumerSignInStart());
      const res = await fetch('/consumer/signin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      dispatch(ConsumerSignInSuccess(data));
      if (data.success === false) {
        dispatch(ConsumerSignInFailure());
        return;
      }
      navigate('/');
    } catch (e) {
      dispatch(ConsumerSignInFailure(e.message));
      console.log(e);
    }
  };

  return (
    <SignInWrapper>
      <SignInContainer>
        <SignInForm onSubmit={handleSubmit}>
        <SignInTitle>Sign In</SignInTitle>

          <SignInInput placeholder="email" type="email" onChange={handleInputChange} value={formData.email} name="email" id="email" />
          <SignInInput type="password" placeholder="password" onChange={handleInputChange} value={formData.password} name="password" id="password" />
          <SignInButton disabled={loading}>Sign In</SignInButton>
          <SignInButton type="button" onClick={handleGuestLogin}>Guest Login</SignInButton>
           <p>Dont'have an account? <NavLink to="/consumersignup">Sign Up</NavLink></p>
        </SignInForm>
      </SignInContainer>
    </SignInWrapper>
  );
}
const SignInWrapper = styled.div`
background-size:cover;
background-position:center;
height:80vh;
display:flex;
margin:auto;
justify-items:center;
align-items:center;

`;
const SignInContainer = styled.div`
background-color:rgba(170,200,244,0.7);
padding:20px;
border-radius:8px;
box-shadow:0 0 10px rgba(111,222,177,0.3);
width:600px;
display:flex;
flex-direction:column;
align-items:center;
`;
const SignInForm = styled.form`
display:flex;
flex-direction:column;
gap:20px;

`;
const SignInTitle = styled.h1`
font-size:24px;
text-align:center
`;
const ErrorMessage = styled.p`
color:red;
`;
const SignInInput = styled.input`
padding:10px;
box-shadow:0 0 10px rgba(111,222,177,0.3);
border:1px solid #ccc;
border-radius:4px;
`;
const SignInButton = styled.button`
padding:10px;
background-color:#007bff;
color:#fff;
border:none;
border-radius:4px;
cursor:pointer;
  
 &:disabled{
  opacity:0.8;
  cursor:not-allowed
 }

`
export default ConsumerSignIn;
