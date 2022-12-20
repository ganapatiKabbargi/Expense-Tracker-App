import React, { useContext, useRef } from "react";
import AuthContex from "../../store/auth-context";
import "./ExpenseForm.css";

const ExpenseForm = () => {
  const authCtx = useContext(AuthContex);
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

    authCtx.addExpense(expense);
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
