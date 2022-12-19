import React, { useEffect, useState } from "react";
import AuthContex from "./auth-context";

const AuthProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [displayName, setDisplayName] = useState("");
  const [photo, setPhoto] = useState("");

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
          setDisplayName(data.users[0].displayName);
          setPhoto(data.users[0].photoUrl);
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

  const contextValue = {
    token: token,
    isLogedIn: userLogedIn,
    displayName: displayName,
    imageUrl: photo,
    login: loginHandler,
  };

  return (
    <AuthContex.Provider value={contextValue}>
      {props.children}
    </AuthContex.Provider>
  );
};

export default AuthProvider;
