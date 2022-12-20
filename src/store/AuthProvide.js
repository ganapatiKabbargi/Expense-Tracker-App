import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContex from "./auth-context";

const AuthProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [displayName, setDisplayName] = useState("");
  const [photo, setPhoto] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
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
          console.log(data);
          setDisplayName(data.users[0].displayName);
          setPhoto(data.users[0].photoUrl);
          setIsVerified(data.users[0].emailVerified);
        });
      })
      .catch((err) => {
        alert(err.error.message);
      });
  }, [token]);

  const userLogedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
  };

  const contextValue = {
    token: token,
    isLogedIn: userLogedIn,
    displayName: displayName,
    imageUrl: photo,
    verified: isVerified,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContex.Provider value={contextValue}>
      {props.children}
    </AuthContex.Provider>
  );
};

export default AuthProvider;
