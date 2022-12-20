import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContex from "../../store/auth-context";

const Navbar = () => {
  const authCtx = useContext(AuthContex);
  const history = useHistory();

  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/auth");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow">
      <div className="container d-flex">
        <a className="navbar-brand fs-2 " href="#home">
          Expense Tracker
        </a>
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
        <div
          className="collapse navbar-collapse d-flex justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item ms-4">
              <a className="nav-link fs-5" aria-current="page" href="#home">
                Home
              </a>
            </li>
            <li className="nav-item  ms-4">
              <a className="nav-link fs-5" href="#home">
                Products
              </a>
            </li>
            <li className="nav-item ms-4">
              <a className="nav-link fs-5" href="#home">
                About Us
              </a>
            </li>
            {authCtx.isLogedIn && !authCtx.displayName && (
              <li className="nav-item ms-4 bg-success rounded">
                <Link to="/updateProfile" className="nav-link fs-5 text-white">
                  Complete profile
                </Link>
              </li>
            )}
            {authCtx.isLogedIn && authCtx.displayName && (
              <li className="nav-item ms-4 bg-primary rounded">
                <Link to="/updateProfile" className="nav-link fs-5 text-white">
                  Update profile
                </Link>
              </li>
            )}
            {authCtx.isLogedIn && (
              <li className="nav-item ms-4">
                <button className="btn " onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
