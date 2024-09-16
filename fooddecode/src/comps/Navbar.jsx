import React from "react";
import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand fs-3 fs-Italic " to="/">
          Apna Khana
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="/navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={"nav-link active"} aria-current="page" to="/">
                Home
              </Link>
              {/* <Link className={(isActive)=>{`nav-link active ${isActive ? "text-cyan-800" : "text-cyan-400"}`}} aria-current="page" to="/">Home</Link> */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Login" tabindex="-1">
                Login
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/SingIn" tabindex="-1">
                SingIn
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
