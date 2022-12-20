import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/AuthForm/Signup";
import Home from "./components/pages/Home";
import UpdateProfile from "./components/UpdateProfile";
import AuthContex from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContex);
  return (
    <div className="App">
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
        {!authCtx.isLogedIn && (
          <Route path="/auth">
            <Login />
          </Route>
        )}
        <Route path="*">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
