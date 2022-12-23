import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { expenseActions } from "../../store/expenseSlice";
import "./ExpenseForm.css";

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const inputAmountRef = useRef("");
  const inputDescriptionRef = useRef("");
  const inputCategoryRef = useRef("");

  const fetchExpenseFromFirebase = async () => {
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
      dispatch(expenseActions.addExpense(fetchedExpenses));
      // setExpenses(fetchedExpenses);
    } catch (err) {
      alert(err.message);
    }
  };

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

  useEffect(() => {
    fetchExpenseFromFirebase();
  }, [fetchExpenseFromFirebase]);

  const submitHandler = (e) => {
    e.preventDefault();
    const expense = {
      amount: inputAmountRef.current.value,
      description: inputDescriptionRef.current.value,
      category: inputCategoryRef.current.value,
    };
    inputAmountRef.current.value = "";
    inputDescriptionRef.current.value = "";
    inputCategoryRef.current.value = "";

    addExpenseToFirebase(expense);
    dispatch(expenseActions.addExpense(expense));
  };
  return (
    <div className="div shadow ">
      <h2 className="text-center">Add Daily Expense</h2>
      <form className="form mt-4" onSubmit={submitHandler}>
        <div className="controll">
          <label>Amount</label>
          <input type="number" required step="100" ref={inputAmountRef} />
        </div>
        <div className="controll">
          <label>Description</label>
          <input type="text" required ref={inputDescriptionRef} />
        </div>
        <div className="controll">
          <label>category</label>
          <select ref={inputCategoryRef}>
            <option>fuel</option>
            <option>shopping</option>
            <option>Chats</option>
            <option>miscellaneous</option>
          </select>
        </div>
        <div className="actionss">
          <button className="btn btn-success ">Add Expense</button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
