import React, { useContext } from "react";
import "./App.css";
import Login from "./components/AuthForm/Signup";
import AuthContex from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContex);
  return (
    <div className="App">
      {authCtx.isLogedIn && <h1>Welcome to Expense tracker</h1>}
      {!authCtx.isLogedIn && <Login />}
    </div>
  );
}

export default App;
