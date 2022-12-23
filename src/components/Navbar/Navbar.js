import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";

const Navbar = () => {
  const history = useHistory();
  const isLogedIn = useSelector((state) => state.auth.isLogedIn);
  const primium = useSelector((state) => state.expense.premium);
  const displayName = useSelector((state) => state.auth.displayName);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
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
            {isLogedIn && !displayName && (
              <li className="nav-item ms-4  rounded">
                <Link to="/updateProfile" className="nav-link fs-5 ">
                  Complete profile
                </Link>
              </li>
            )}
            {isLogedIn && displayName && (
              <li className="nav-item ms-4  rounded">
                <Link to="/updateProfile" className="nav-link fs-5 ">
                  Update profile
                </Link>
              </li>
            )}
            {isLogedIn && (
              <li className="nav-item ms-4">
                <button className="btn fs-5" onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            )}

            {primium && (
              <li className="nav-item ms-4">
                <button className="btn fs-5 bg-success">Premium</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
