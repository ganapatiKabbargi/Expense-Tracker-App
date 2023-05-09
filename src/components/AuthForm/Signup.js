import React, { Fragment, useEffect, useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
import { themeActions } from "../../store/themeSlice";
import Loader from "../../UI/Loader";
import "./Signup.css";
import ErrorModal from "../../UI/ErrorModal";
import Notification from "../../UI/Notification";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const toggle = useSelector((state) => state.theme.toggle);
  const verified = useSelector((state) => state.auth.user.emailVerified);
  const loader = useSelector((state) => state.theme.loader);
  const dispatch = useDispatch();
  const history = useHistory();
  const notification = useSelector((state) => state.theme.Notification);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => {
      return !prevState;
    });
  };


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(themeActions.showLoader());
    if (isLogin) {

      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCdAt2TovMTe4PkgyCuLYXvHQK7AgVi-YI",
        {
          method: "POST",
          body: JSON.stringify({
            email: mail,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            dispatch(themeActions.showNotification());
            return response.json();
          } else {
            return response.json().then((data) => {
              // let errorMesssage = "Authentication Failed";
              throw data;
            });
            // throw new Error(response.json());
          }
        })
        .then((data) => {
          console.log(data);
          dispatch(authActions.login({ idToken: data.idToken, email: mail }));
          history.replace("/verify");
          dispatch(themeActions.hideLoader());
          // dispatch(themeActions.showNotification());
        })
        .catch((err) => {
          if (err.error) {
            setError(err.error.message);
            dispatch(themeActions.hideLoader());
          } else {
            setError("INTERNET_DISCONNECTED");
            dispatch(themeActions.hideLoader());
          }
        });
    } else {
      if (password === confirmPassword) {
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCdAt2TovMTe4PkgyCuLYXvHQK7AgVi-YI",
          {
            method: "POST",
            body: JSON.stringify({
              email: mail,
              password: password,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => {
            if (response.ok) {
              dispatch(themeActions.hideLoader());
              return response.json();
            } else {
              return response.json().then((data) => {
                // let errorMesssage = "Authentication Failed";

                throw data.error.message;
              });
            }
          })
          .then((data) => {
            switchAuthModeHandler();
            console.log("user has successfully signed up");
          })
          .catch((err) => {
            // alert(err.message);
            setError(err);
            dispatch(themeActions.hideLoader());
          });
      } else {
        dispatch(themeActions.hideLoader());
        history.push("/auth");
        setError("Password not match");
      }
    }
  };

  const passwordHandler = () => {
    history.push("/password");
  };

  const errorHandler = () => {
    setError("");
    history.push("/auth");
  };
  return (
    <Fragment>
      <Navbar />
      {loader && <Loader />}
      {error && <ErrorModal message={error} errorHandler={errorHandler} />}

      {!loader && !error && (
        <div className={toggle ? "form-div shadow " : "form-div shadow light"}>
          <h2 className="text-center">{isLogin ? "Login" : "Sign Up"}</h2>
          <form onSubmit={submitHandler}>
            <div className="control">
              <label>Email</label>
              <input
                type="email"
                value={mail}
                onChange={(e) => {
                  setMail(e.target.value);
                }}
              />
              <span className="validity">Please Enter Valid Email</span>
            </div>
            <div className="control">
              <label>Password</label>
              <input
                type="password"
                pattern="^.{6,32}$"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <span className="validity">
                Your Password must contain atleast 6 character
              </span>
            </div>
            {!isLogin && (
              <div className="control">
                <label>Confirm Password</label>
                <input
                  type="password"
                  pattern="^.{6,32}$"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                ></input>
                <span className="validity">
                  Your Password must contain atleast 6 character
                </span>
              </div>
            )}
            <div className="actions ">
              <button
                className="btn w-100"
                style={{
                  background: "linear-gradient(to left, #141e30 , #43cea2 )",
                }}
              >
                {isLogin ? "Login" : "SignUp"}
              </button>
            </div>
          </form>
          {isLogin && (
            <div className="text-center mt-4">
              <button className="btn text-white " onClick={passwordHandler}>
                Forget password?
              </button>
            </div>
          )}
          <div className="text-center mt-2">
            <button className="btn text-white" onClick={switchAuthModeHandler}>
              {isLogin
                ? "Dont have an account? Signup"
                : "Already have an account? Login"}
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Login;
