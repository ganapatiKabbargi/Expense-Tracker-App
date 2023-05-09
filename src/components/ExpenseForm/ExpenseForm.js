import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpenseToFirebase } from "../../store/expense-actions";

import "./ExpenseForm.css";

const ExpenseForm = () => {
  const email = useSelector((state) => state.auth.email);
  const userName = useSelector((state) => state.auth.user.displayName);
  const dispatch = useDispatch();
  const inputAmountRef = useRef("");
  const inputDescriptionRef = useRef("");
  const inputCategoryRef = useRef("");

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

    dispatch(addExpenseToFirebase(expense, email));
  };
  return (
    <div
      className="div shadow "
      style={{
        background: "linear-gradient(to top left, #141e30 , #243b55 )",
      }}
    >
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
          <button className="btn shadow">Add Expense</button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
