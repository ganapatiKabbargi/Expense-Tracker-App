import React from "react";

const AuthContex = React.createContext({
  token: "",
  isLogedIn: false,
  login: () => {},
  expenses: [],
});

export default AuthContex;
