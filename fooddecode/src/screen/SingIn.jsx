import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SingIn = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  // Initialize useNavigate for redirection
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      // Store the auth token in local storage
      localStorage.setItem("authToken", json.authToken);

      // Redirect to home page after successful signup
      navigate("/");
    } else {
      // Show an alert for invalid credentials
      alert("User already exists or invalid credentials. Please try again.");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="mt-4 p-4">
        <div className="form-group">
          <label htmlFor="exampleInputName">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={credentials.name}
            placeholder="Name eg: Narendra Modi"
            onChange={onChange}
          />
        </div>

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
          <label htmlFor="exampleInputLocation">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={credentials.location}
            placeholder="Location eg: xyz col, New Delhi"
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
          Sing Up
        </button>
        <Link to="/Login" className="m-3 btn btn-dark">
          Go to Login
        </Link>
      </form>
    </div>
  );
};
