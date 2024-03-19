import React, { useState } from "react";
import {
  ConsumerSignInFailure,
  ConsumerSignInStart,
  ConsumerSignInSuccess,
  
} from "../redux/slice/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(ConsumerSignInStart());
      const res = await fetch("http://localhost:5000/consumer/signin", {
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
      navigate('/consumerproducts');
    } catch (e) {
      dispatch(ConsumerSignInFailure(e.message));
      console.log(e);
    }
  };

  return (
    <>
      <div>
        <h3>Sign In</h3>
        <form onSubmit={handleSubmit}>
          <input type="email" onChange={handleInputChange} value={formData.email} name="email" id="email" />
          <input type="password" onChange={handleInputChange} value={formData.password} name="password" id="password" />
          <button disabled={loading}>Sign In</button>
        </form>
      </div>
    </>
  );
}

export default ConsumerSignIn;
