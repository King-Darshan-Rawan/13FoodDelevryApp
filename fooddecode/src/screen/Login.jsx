import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  let navigate = useNavigate()

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginUser", { // Use /loginUser endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter Valid credentials");
    }
    if (json.success) {
      localStorage.setItem("authToken", json.authToken)
    navigate("/");  
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value }); // Update specific field
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="mt-4 p-4">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={credentials.email}
            placeholder="Email eg: narendramodi@gmail.com"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            placeholder="Password eg: 123456789"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-success m-3">
          Log-In
        </button>
        <Link to="/SingIn" className="m-3 btn btn-dark">
          Go to Sign-Up
        </Link>
        don't have an account?
      </form>
    </div>
  );
};
