import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();
    if (!json.success) {
      alert("Enter valid credentials");
    } else {
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("userEmail", credentials.email);
      navigate("/");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="container h-100 d-flex justify-content-center align-items-center min-vh-100 ">
      <div className="card shadow-sm p-4" style={{ maxWidth: "90%", width: "500px" }}>
        <h2 className="text-center mb-4 fontCapslocal">Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              placeholder="Email eg: narendramodi@gmail.com"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              placeholder="Password eg: 123456789"
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 mb-3">
            Log In
          </button>
          <Link to="/SingIn" className="btn btn-dark w-100">
            Go to Sign-Up
          </Link>
          <div className="text-center mt-2">Don't have an account?</div>
        </form>
      </div>
    </div>
  );
};
