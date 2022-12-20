import React from "react";

const AuthContex = React.createContext({
  token: "",
  isLogedIn: false,
  expenses: [],
  displayName: "",
  imageUrl: "",
  verified: false,
  login: () => {},
  logout: () => {},
  addExpense: () => {},
  fetchExpense: () => {},
});

export default AuthContex;
