import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContex from "./auth-context";

const AuthProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [displayName, setDisplayName] = useState("");
  const [photo, setPhoto] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const userLogedIn = !!token;

  const fetchExpenseFromFirebase = useCallback(async () => {
    try {
      const response = await fetch(
        "https://expense-tracker-58168-default-rtdb.firebaseio.com/expenses.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      const fetchedExpenses = [];
      for (let key in data) {
        fetchedExpenses.push({
          id: key,
          amount: data[key].amount,
          description: data[key].description,
          category: data[key].category,
        });
      }
      setExpenses(fetchedExpenses);
    } catch (err) {
      alert(err.message);
    }
  }, []);

  const addExpenseToFirebase = async (expense) => {
    try {
      const response = await fetch(
        "https://expense-tracker-58168-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "POST",
          body: JSON.stringify(expense),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        fetchExpenseFromFirebase();
      }
      const data = await response.json();
    } catch (err) {
      alert(err);
    }
  };

  const fetchAccountDetails = () => {
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
          setIsVerified(data.users[0].emailVerified);
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    fetchExpenseFromFirebase();
  }, [fetchExpenseFromFirebase]);

  useEffect(() => {
    fetchAccountDetails();
  }, [token]);

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
  };

  const addExpenseHandler = (expense) => {
    addExpenseToFirebase(expense);
  };

  const contextValue = {
    token: token,
    isLogedIn: userLogedIn,
    displayName: displayName,
    imageUrl: photo,
    verified: isVerified,
    expenses: expenses,
    login: loginHandler,
    logout: logoutHandler,
    addExpense: addExpenseHandler,
    fetchExpense: fetchExpenseFromFirebase,
  };

  return (
    <AuthContex.Provider value={contextValue}>
      {props.children}
    </AuthContex.Provider>
  );
};

export default AuthProvider;
