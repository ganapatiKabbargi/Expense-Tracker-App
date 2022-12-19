import React, { useState } from "react";
import AuthContex from "./auth-context";

const AuthProvider = (props) => {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(false);

  const userLogedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
  };

  const completeProfileHandler = () => {
    setProfile((previous) => {
      return !previous;
    });
  };

  const contextValue = {
    token: token,
    isLogedIn: userLogedIn,
    profile: profile,
    login: loginHandler,
    completeProfile: completeProfileHandler,
  };

  return (
    <AuthContex.Provider value={contextValue}>
      {props.children}
    </AuthContex.Provider>
  );
};

export default AuthProvider;
