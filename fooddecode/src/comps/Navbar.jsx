import React, { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import Cart from "../screen/Cart";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from "react-router-dom";
import Modal from "../screen/Modal";
import Badge from "react-bootstrap/Badge";
import { useIncludeCart } from "./ContextReducer";

export const Navbar = () => {
  const cartData = useIncludeCart(); 
  let itemCount = cartData.length;

  const [cartView, setCartview] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    navigate("/Login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand fs-3 fs-italic mb-2 fontCapslocal" to="/">
          Apna Khana
        </Link>
        {/* Toggler button for mobile */}
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
        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active fs-5"
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            {localStorage.getItem("authToken") && (
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/MyOrders"
                >
                  My Orders
                </Link>
              </li>
            )}
          </ul>
          {/* Right-side buttons */}
          <div className="d-flex m-3">
            {localStorage.getItem("authToken") ? (
              <div className="d-flex flex-row">
                {/* Cart Button */}
                <div>
                  <button
                    className="btn bg-white text-success mx-1 position-relative"
                    onClick={() => setCartview(true)}
                  >
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {itemCount}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                    <ShoppingCartIcon />
                  </button>
                </div>
                {cartView && (
                  <Modal onClose={() => setCartview(false)}>
                    <Cart />
                  </Modal>
                )}
                {/* Logout Button */}
                <div>
                  <button
                    className="btn bg-white text-success mx-1"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="d-flex flex-row">
                {/* Login and Sign In Buttons */}
                <Link
                  className="btn bg-white text-success mx-1"
                  to="/Login"
                  tabIndex="-1"
                >
                  Login <PersonIcon />
                </Link>
                <Link
                  className="btn bg-white text-success mx-1"
                  to="/SingIn"
                  tabIndex="-1"
                >
                  Sign In <SupervisedUserCircleIcon />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
