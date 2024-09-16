import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/Login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand fs-3 fs-Italic mb-3" to="/">
          Apna Khana
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className={"nav-link active fs-5"} aria-current="page" to="/">
                Home
              </Link>
            </li>
          </ul>
          <div className="d-flex txt-white m-3">
            {localStorage.getItem("authToken") ? (
              <div>
                <button className="btn bg-white text-success mx-1" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <Link className="btn bg-white text-success mx-1" to="/Login" tabIndex="-1">
                  Login
                </Link>
                <Link className="btn bg-white text-success mx-1" to="/SingIn" tabIndex="-1">
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
