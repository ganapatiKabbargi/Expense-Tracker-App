import React, { Fragment, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import "./Login.css";

const Login = () => {
  const inputEmailRef = useRef("");
  const inputPasswordRef = useRef("");

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbpLNr_eEETNGNveU64MVJ1lJtYvkP9bM",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
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
            let errorMesssage = "Authentication Failed";

            throw new Error(errorMesssage);
          });
        }
      })
      .then((data) => {
        console.log("user has successfully signed up");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Fragment>
      <Navbar />
      <div className="form-div shadow">
        <h2 className="text-center">Sign Up</h2>
        <form onSubmit={submitHandler}>
          <div className="control">
            <label>Email</label>
            <input type="email" required ref={inputEmailRef} />
          </div>
          <div className="control">
            <label>Password</label>
            <input type="password" required ref={inputPasswordRef} />
          </div>
          <div className="control">
            <label>Confirm Password</label>
            <input type="password" required></input>
          </div>
          <div className="actions">
            <button>Sign up</button>
          </div>
        </form>
        <div className="text-center mt-2">
          <button className="btn ">Already have an account? Login</button>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
