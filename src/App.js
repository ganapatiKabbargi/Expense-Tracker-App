import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import PasswordReset from "./components/AuthForm/PasswordReset";
import Login from "./components/AuthForm/Signup";
import Home from "./components/pages/Home";
import UpdateProfile from "./components/UpdateProfile";
import { authActions } from "./store/authSlice";

function App() {
  const token = useSelector((state) => state.auth.bearerToken);
  const toggle = useSelector((state) => state.theme.toggle);
  const dispatch = useDispatch();
  const fetchAccountDetails = useCallback(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAbpLNr_eEETNGNveU64MVJ1lJtYvkP9bM",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json().then((data) => {
          dispatch(authActions.setDisplayName(data.users[0].displayName));
          dispatch(authActions.setPhoto(data.users[0].photoUrl));
          dispatch(authActions.setIsVerified(data.users[0].emailVerified));
          console.log("hi");
          console.log(data.users[0].emailVerified);
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  useEffect(() => {
    fetchAccountDetails();
  }, [token]);
  const isLogedIn = useSelector((state) => state.auth.isLogedIn);
  return (
    <div className={toggle ? "dark" : "App"}>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/updateProfile">
          <UpdateProfile />
        </Route>
        {isLogedIn && (
          <Route path="/auth">
            <Login />
          </Route>
        )}
        <Route path="/password">
          <PasswordReset></PasswordReset>
        </Route>
        <Route path="*">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
