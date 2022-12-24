import React, { Fragment, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Signup.css";
const PasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const toggle = useSelector((state) => state.theme.toggle);
  const inputEmailRef = useRef("");
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const enteredEmail = inputEmailRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAbpLNr_eEETNGNveU64MVJ1lJtYvkP9bM",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enteredEmail,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            let errorMesssage = "resetting password failed";
            throw new Error(errorMesssage);
          });
        }
      })
      .then((data) => {
        alert("Link has been sent to your mail reset the password");
        history.replace("/auth");
      })
      .catch((err) => {
        alert(err.messsage);
      });
  };

  const clickHandler = () => {
    history.push("/auth");
  };
  return (
    <Fragment>
      <Navbar />
      <div
        className={
          toggle ? "form-div shadow bg-light" : "form-div shadow light"
        }
      >
        <div className="d-flex justify-content-between mb-5">
          <h2>Reset Password</h2>
          <button className="btn btn-outline-primary" onClick={clickHandler}>
            X
          </button>
        </div>
        <form onSubmit={submitHandler}>
          <div className="control">
            <label className="text-success">Enter Your Email</label>
            <input type="email" required ref={inputEmailRef} />
          </div>
          <button className="btn bg-primary text-white w-100">
            {loading ? "sending Link to mail" : "Reset Password"}
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default PasswordReset;
