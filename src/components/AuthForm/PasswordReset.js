import React, { Fragment, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./PasswordReset.css";
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
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCdAt2TovMTe4PkgyCuLYXvHQK7AgVi-YI",
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
      <div className="contain">
        <div className="popup">
          <div className="text-end ">
            <button className="back" onClick={clickHandler}>
              X
            </button>
          </div>
          <form className="formm" onSubmit={submitHandler}>
            <div className="note">
              <label className="title">Forgot your password?</label>
              <span className="subtitle">
                Enter your email and submit you will get link to change your
                password
              </span>
            </div>
            <input
              placeholder="Enter your e-mail"
              title="Enter your e-mail"
              name="email"
              type="email"
              className="input_field"
              required
              ref={inputEmailRef}
            />
            <button className="submit">submit</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default PasswordReset;
