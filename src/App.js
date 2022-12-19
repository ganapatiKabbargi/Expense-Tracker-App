import React, { useContext } from "react";
import "./App.css";
import Login from "./components/AuthForm/Signup";
import CompleteProfile from "./components/CompleteProfile";
import UpdateProfile from "./components/UpdateProfile";
import AuthContex from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContex);
  return (
    <div className="App">
      {authCtx.isLogedIn && !authCtx.profile && <CompleteProfile />}
      {authCtx.profile && <UpdateProfile />}
      {!authCtx.isLogedIn && <Login />}
    </div>
  );
}

export default App;
