import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow">
      <div className="container d-flex">
        <a className="navbar-brand fs-2 " href="#">
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
              <a className="nav-link fs-5" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item  ms-4">
              <a className="nav-link fs-5" href="#">
                Products
              </a>
            </li>
            <li className="nav-item ms-4">
              <a className="nav-link fs-5" href="#">
                About Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
