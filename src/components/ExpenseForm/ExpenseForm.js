import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpenseToFirebase } from "../../store/expense-actions";

import "./ExpenseForm.css";

const ExpenseForm = () => {
  const email = useSelector((state) => state.auth.email);
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
        background: "white",
      }}
    >
      <div
        style={{
          fontSize: "18px",
          color: " #4a3b3b",
          fontWeight: "600",
          margin: "10px ",
        }}
      >
        Add your Expense Here
      </div>
      <form className="form  border" onSubmit={submitHandler}>
        <div className="controll">
          <label>Amount</label>
          <input type="number" required step="100" ref={inputAmountRef} />
        </div>
        <div className="controll">
          <label>Description</label>
          <input type="text" required ref={inputDescriptionRef} />
        </div>
        <div className="controll">
          <label>Category</label>
          <select ref={inputCategoryRef}>
            <option>Fuel</option>
            <option>Shopping</option>
            <option>Chats</option>
            <option>Miscellaneous</option>
          </select>
        </div>
        <div className="actionss">
          <button className=" shadow">Add Expense</button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
