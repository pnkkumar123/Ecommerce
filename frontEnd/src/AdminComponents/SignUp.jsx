import React, { useState } from "react";

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
    <div>
      {error && <p>Error: Failed to sign up. Please try again later.</p>}
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="Name"
          id="name"
        />
        <input
          onChange={handleChange}
          type="text"
          name="userName"
          id="userName"
          placeholder="UserName"
        />

        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Email"
          id="email"
        />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Password"
          id="password"
        />
        <button disabled={loading}>{loading ? "Loading..." : "Sign Up"}</button>
      </form>
    </div>
  );
}

export default SignUp;
