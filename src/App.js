import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import PasswordReset from "./components/AuthForm/PasswordReset";
import Login from "./components/AuthForm/Signup";
import VerifyEmail from "./components/AuthForm/VerifyEmail";
import Home from "./components/pages/Home";
import UpdateProfile from "./components/AuthForm/UpdateProfile";
import { themeActions } from "./store/themeSlice";
import { fetchDetails } from "./store/auth-actions";

function App() {
  const token = useSelector((state) => state.auth.bearerToken);
  const toggle = useSelector((state) => state.theme.toggle);
  const email = useSelector((state) => state.auth.email);
  const verified = useSelector((state) => state.auth.user.emailVerified);

  const dispatch = useDispatch();

  console.log("App RUNNUNG...");

  useEffect(() => {
    console.log("inside useEffect..");
    console.log(localStorage.getItem("email"));
    if (localStorage.getItem(email + "prime")) {
      dispatch(themeActions.premium());
    }
    if (localStorage.getItem(email + "theme")) {
      dispatch(themeActions.showToggle());
    }
    if (token) {
      dispatch(fetchDetails(token));
    }
  }, [token]);

  const isLogedIn = useSelector((state) => state.auth.isLogedIn);
  return (
    <div className={toggle ? "dark" : "App"}>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        {isLogedIn && (
          <Route path="/verify">
            <VerifyEmail />
          </Route>
        )}
        {isLogedIn && verified && (
          <Route path="/home">
            <Home />
          </Route>
        )}
        {isLogedIn && verified && (
          <Route path="/updateProfile">
            <UpdateProfile />
          </Route>
        )}

        <Route path="/auth">
          <Login />
        </Route>

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
