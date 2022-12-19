import React, { useState } from "react";
import AuthContex from "./auth-context";

const AuthProvider = (props) => {
  const [token, setToken] = useState(null);

  const userLogedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
  };

  const contextValue = {
    token: token,
    isLogedIn: userLogedIn,
    login: loginHandler,
  };

  return (
    <AuthContex.Provider value={contextValue}>
      {props.children}
    </AuthContex.Provider>
  );
};

export default AuthProvider;
