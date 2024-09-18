import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SingIn = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
  
      const json = await response.json();
      // console.log("Response JSON:", json); 
  
      if (json.success && json.authToken) {
        localStorage.setItem("authToken", json.authToken);
        localStorage.setItem("userEmail", credentials.email); // Save the user's email
        // console.log("Auth Token and Email Saved:", localStorage.getItem("authToken"), localStorage.getItem("userEmail"));
        navigate("/");
      }
       else {
        alert("User already exists or invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-sm p-4" style={{ maxWidth: "90%", width: "500px" }}>
        <h2 className="text-center mb-4 fontCapslocal">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={credentials.name}
              placeholder="Name eg: Narendra Modi"
              onChange={onChange}
            />
          </div>
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
            <label htmlFor="location" className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={credentials.location}
              placeholder="Location eg: xyz col, New Delhi"
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
            Sign Up
          </button>
          <Link to="/Login" className="btn btn-dark w-100">
            Go to Login
          </Link>
        </form>
      </div>
    </div>
  );
};
