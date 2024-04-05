import React, { useState } from "react";
import {NavLink, useNavigate} from 'react-router-dom';
import styled from 'styled-components';

const ConsumerSignUp = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    name: "",
    password: "",
    email: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`${window.location.origin}/consumer/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      navigate('/consumersignin')
      if (!data.success) {
        setError(true);
        return;
      }
    } catch (e) {
      console.log(e);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <SignUpWrapper>
      <SignUpContainer>
        <SignUpForm onSubmit={handleSubmit}>
          <SignUpTitle>Sign up to Shop</SignUpTitle>
          {error && <ErrorMessage>Error: failed to signup. Please try again later</ErrorMessage>}
          <SignUpInput onChange={handleInputChange} type="text" name="name" id="name" placeholder="Full Name" />
          <SignUpInput onChange={handleInputChange} type="email" name="email" id="email" placeholder="Email" />
          <SignUpInput onChange={handleInputChange} type="password" name="password" id="password" placeholder="Password" />
          <SignUpInput onChange={handleInputChange} type="text" name="userName" id="userName" placeholder="Username" />
          <SignUpButton disabled={loading}>Sign Up</SignUpButton>
          <p>Already have an account? <NavLink to="/consumersignin">Sign In</NavLink></p>
        </SignUpForm>
      </SignUpContainer>
    </SignUpWrapper>
  );
}

const SignUpWrapper = styled.div`

  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  margin:auto;
  justify-items: center;
  align-items: center;
`;

const SignUpContainer = styled.div`
  background-color: rgba(170,190,244,0.7);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(111, 222, 177, 0.3);
  width: 600px; /* Adjust the width as needed */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SignUpTitle = styled.h1`
  font-size: 24px;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const SignUpInput = styled.input`
  padding: 10px;
  box-shadow: 0 0 10px rgba(111, 222, 177, 0.3);
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SignUpButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
`;

export default ConsumerSignUp;
