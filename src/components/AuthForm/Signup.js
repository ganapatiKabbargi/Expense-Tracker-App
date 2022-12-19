import React, { Fragment, useContext, useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";
import AuthContex from "../../store/auth-context";
import "./Signup.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const inputEmailRef = useRef("");
  const inputPasswordRef = useRef("");

  const authCtx = useContext(AuthContex);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => {
      return !prevState;
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;

    let url;

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbpLNr_eEETNGNveU64MVJ1lJtYvkP9bM";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbpLNr_eEETNGNveU64MVJ1lJtYvkP9bM";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
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
        authCtx.login(data.idToken);
        console.log(data.idToken);
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
        <h2 className="text-center">{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={submitHandler}>
          <div className="control">
            <label>Email</label>
            <input type="email" required ref={inputEmailRef} />
          </div>
          <div className="control">
            <label>Password</label>
            <input type="password" required ref={inputPasswordRef} />
          </div>
          {!isLogin && (
            <div className="control">
              <label>Confirm Password</label>
              <input type="password" required></input>
            </div>
          )}
          <div className="actions">
            <button>{isLogin ? "Login" : "SignUp"}</button>
          </div>
        </form>
        {isLogin && (
          <div className="text-center mt-2">
            <button className="btn ">Forget password?</button>
          </div>
        )}
        <div className="text-center mt-2">
          <button className="btn " onClick={switchAuthModeHandler}>
            {isLogin
              ? "Dont have an account? Signup"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;