import React, { useState } from "react";
import styled from 'styled-components';


function SignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    name:'',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);

      const res = await fetch("http://localhost:5000/seller/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.sucess = false) {
        setError(true);
        return;
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <SignUpWrapper>
      <SignUpContainer>
      {error && <p>Error: Failed to sign up. Please try again later.</p>}
      <SignUpForm onSubmit={handleSubmit}>
        <SignUpTitle>Seller Sign Up</SignUpTitle>
        <SignUpInput
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="Name"
          id="name"
        />
        <SignUpInput
          onChange={handleChange}
          type="text"
          name="userName"
          id="userName"
          placeholder="UserName"
        />

        <SignUpInput
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Email"
          id="email"
        />
        <SignUpInput
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Password"
          id="password"
        />
        <SignUpButton disabled={loading}>{loading ? "Loading..." : "Sign Up"}</SignUpButton>
      </SignUpForm>
      </SignUpContainer>
    </SignUpWrapper>
  );
}
const SignUpWrapper = styled.div`
background-size:cover;
background-position:center;
min-height:80vh;
display:flex;
margin:auto;
justify-items:center;
align-items:center;

`;
const SignUpContainer = styled.div`
background-color:rgba(170,190,244,0.7);
padding:20px;
border-radius:8px;
box-shadow:0 0 10px rgba(111,222,177,0.3);
widht:600px;
display:flex;
flex-direction:column;
align-items:center;
`;

const SignUpForm = styled.form`
display:flex;
flex-direction:column;
gap:20px;
`
const SignUpTitle = styled.h1`
font-size:24px;
text-align:center;

`
const ErrorMessage = styled.p`
color:red;
`;
const SignUpInput = styled.input`
padding:10px;
box-shadow:0 0 10px rgba (111,222,177,0.3);
border:1px solid #ccc;
border-radius:4px;
`
const SignUpButton = styled.button`
padding:10px;
background-color:#007bff;
color:#fff;
border:none;
border-radius:4px;
cursor:pointer;

&:disabled{
  opacity:0.8;
  cursor:not-allowed;

}
`
export default SignUp;
