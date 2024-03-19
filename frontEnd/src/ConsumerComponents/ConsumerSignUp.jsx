import React, { useState } from "react";

function ConsumerSignUp() {
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
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("http://localhost:5000/consumer/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if ((data.success = false)) {
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
    <div>
      {error && <p>Error: failed to signup.please try again later</p>}
      <form onSubmit={handleSubmit}>
        <input onChange={handleInputChange} type="text" name="" id="" />
        <input onChange={handleInputChange} type="email" name="email" id="email" />
        <input onChange={handleInputChange} type="password" name="password" id="password" />
        <input onChange={handleInputChange} type="userName" name="userName" id="userName" />
        <button disabled={loading}>submit</button>
      </form>
    </div>
  );
}

export default ConsumerSignUp;
