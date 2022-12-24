import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
import { themeActions } from "../../store/themeSlice";

const Navbar = () => {
  const history = useHistory();
  const isLogedIn = useSelector((state) => state.auth.isLogedIn);
  const primium = useSelector((state) => state.theme.premium);
  const displayName = useSelector((state) => state.auth.displayName);
  const togglebtn = useSelector((state) => state.theme.togglebtn);
  const toggle = useSelector((state) => state.theme.toggle);
  const expenses = useSelector((state) => state.expense.expenses);
  const dispatch = useDispatch();

  const expenseList = expenses
    .map((e) => {
      return [e.description, e.category, e.amount];
    })
    .join("\n");
  const blob = new Blob([expenseList]);
  const ref = URL.createObjectURL(blob);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.replace("/auth");
  };

  const themeHandler = () => {
    dispatch(themeActions.showToggle());
  };

  const togglehemeHandler = () => {
    dispatch(themeActions.switchToggle());
  };
  return (
    <nav
      className={"navbar navbar-expand-lg navbar-dark  text-white shadow"}
      style={{ backgroundColor: "#e63838" }}
    >
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
              <li className="nav-item ms-4 ">
                <button className="btn fs-5 text-white" onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            )}
            {primium && isLogedIn && (
              <li className="nav-item ms-4">
                <button
                  className="btn fs-5 "
                  style={{ backgroundColor: "#ffd700" }}
                  onClick={themeHandler}
                >
                  {togglebtn ? "Premium" : "Activate Premium"}
                </button>
              </li>
            )}
            {primium && togglebtn && isLogedIn && (
              <li className="nav-item ms-4">
                <button
                  className={
                    toggle
                      ? "btn fs-5 bg-dark text-light "
                      : "btn fs-5 bg-light text-secondary "
                  }
                  onClick={togglehemeHandler}
                >
                  {toggle ? "Light" : "Dark "}
                </button>
              </li>
            )}

            {isLogedIn && (
              <li className="nav-item ms-4 ">
                <a
                  className="btn btn-primary fs-5 text-white"
                  download="file.csv"
                  href={ref}
                >
                  Download
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
