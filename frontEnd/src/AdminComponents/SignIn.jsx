import React, { useState } from "react";
import styled from 'styled-components';
import {
  SellerSignInFailure,
  SellerSignInSuccess,
 SellerSignInStart 
} from "../redux/slice/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(SellerSignInStart());
      const res = await fetch("http://localhost:5000/seller/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      dispatch(SellerSignInSuccess(data));
      if(data.sucess === false){
       dispatch(SellerSignInFailure());
        return;
      }

      navigate('/dashboard')
    } catch (error) {
      dispatch(SellerSignInFailure(error));
      console.log(error);
    }
  };

  return (
    <SignInWrapper>
      <SignInContainer>
        <SignInTitle>Sign In</SignInTitle>
        <SignInForm onSubmit={handleSubmit}>
          <SignInInput
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
          />
          <SignInInput
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
          />
          <SignInButton disabled={loading} type="submit">Sign In</SignInButton>
        </SignInForm>
      </SignInContainer>
    </SignInWrapper>
  );
}
const SignInWrapper = styled.div`
background-size:cover;
background-position:center;
min-height:80vh;
display:flex;
margin:auto;
justify-items:center;
align-items:center;
`
const SignInContainer = styled.div`
background-color:rgba(170,190,244,0.7)
padding:20px;
border-radius:8px;
box-shadow:0 0 10px rgba(111,222,177,0.3);
width:600px;
display:flex;
flex-direction:column;
align-items:center;
`
const SignInForm = styled.form`
display:flex;
flex-direction:column;
gap:20px;
`
const SignInTitle = styled.h1`
font-size:24px;
text-align:center;
`;
const ErrorMessage = styled.p`
color:red;

`;
const SignInInput = styled.input`
padding:10px;
box-shadow:0 0 10px rgba(111,222,177,0.3);
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
export default SignIn;
