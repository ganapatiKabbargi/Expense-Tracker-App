import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
import { themeActions } from "../../store/themeSlice";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { CgDarkMode } from "react-icons/cg";
import { HiDownload } from "react-icons/hi";

const Navbar = () => {
  const history = useHistory();
  const isLogedIn = useSelector((state) => state.auth.isLogedIn);
  const primium = useSelector((state) => state.theme.premium);
  const togglebtn = useSelector((state) => state.theme.togglebtn);
  const toggle = useSelector((state) => state.theme.toggle);
  const expenses = useSelector((state) => state.expense.expenses);
  const notification = useSelector((state) => state.theme.Notification);
  const verified = useSelector((state) => state.auth.user.emailVerified);
  const dispatch = useDispatch();

  console.log("Navbar Running...");
  const expenseList = expenses
    .map((e) => {
      return [e.description, e.category, e.amount];
    })
    .join("\n");
  const blob = new Blob([expenseList]);
  const ref = URL.createObjectURL(blob);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    dispatch(authActions.logout());
    dispatch(themeActions.logout());
    history.replace("/auth");
  };

  const themeHandler = () => {
    dispatch(themeActions.showToggle());
    localStorage.setItem(localStorage.getItem("email") + "theme", true);
  };

  const togglehemeHandler = () => {
    dispatch(themeActions.switchToggle());
  };
  return (
    <nav
      className={"navbar navbar-expand-lg navbar-dark  text-white shadow"}
      style={{
        background: "linear-gradient(to right, #141e30 , #43cea2 )",
      }}
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
            {primium && isLogedIn && !notification && (
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
            {primium && togglebtn && isLogedIn && !notification && (
              <li className="nav-item ms-4">
                <button
                  className={
                    toggle
                      ? "btn   text-light border-0"
                      : "btn   text-dark border-0"
                  }
                  onClick={togglehemeHandler}
                >
                  <CgDarkMode size={"30px"} />
                </button>
              </li>
            )}

            {isLogedIn && verified && !notification && (
              <li className="nav-item ms-4 ">
                <a
                  className="btn  fs-5 text-white"
                  download="file.csv"
                  href={ref}
                >
                  <HiDownload size={"30px"} />
                </a>
              </li>
            )}
            {isLogedIn && verified && !notification && (
              <li className="nav-item ms-4 ">
                <button
                  className="btn fs-5 text-white border-0"
                  onClick={logoutHandler}
                >
                  <RiLogoutCircleRLine size={"30px"} />
                </button>
              </li>
            )}

            {isLogedIn && verified && !notification && (
              <li className="nav-item ms-4  rounded">
                <Link to="/updateProfile" className="nav-link fs-5 ">
                  <CgProfile size={"30px"} />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
