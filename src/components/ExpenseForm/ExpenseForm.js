import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpenseToFirebase,
  editExpenseInFirebase,
} from "../../store/expense-actions";

import "./ExpenseForm.css";
import { expenseActions } from "../../store/expenseSlice";

const ExpenseForm = () => {
  const email = useSelector((state) => state.auth.email);
  const editexpense = useSelector((state) => state.expense.expense);
  const id = useSelector((state) => state.expense.id);
  const dispatch = useDispatch();
  const inputAmountRef = useRef("");
  const inputDescriptionRef = useRef("");
  const inputCategoryRef = useRef("");
  const category = ["Fuel", "Shopping", "Chats", "Miscellaneous"];

  const removeEditHandler = () => {
    dispatch(expenseActions.setExpense(""));
    inputAmountRef.current.value = "";
    inputDescriptionRef.current.value = "";
    inputCategoryRef.current.value = "";
  };

  if (editexpense) {
    inputAmountRef.current.value = editexpense.amount;
    inputDescriptionRef.current.value = editexpense.description;
    inputCategoryRef.current.value = editexpense.category;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (editexpense) {
      const expense = {
        amount: inputAmountRef.current.value,
        description: inputDescriptionRef.current.value,
        category: inputCategoryRef.current.value,
      };
      inputAmountRef.current.value = "";
      inputDescriptionRef.current.value = "";
      inputCategoryRef.current.value = "";

      dispatch(editExpenseInFirebase(expense, email, id));
    } else {
      const expense = {
        amount: inputAmountRef.current.value,
        description: inputDescriptionRef.current.value,
        category: inputCategoryRef.current.value,
      };
      inputAmountRef.current.value = "";
      inputDescriptionRef.current.value = "";
      inputCategoryRef.current.value = "";

      dispatch(addExpenseToFirebase(expense, email));
    }
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
          fontSize: "26px",
          // color: " #4a3b3b",
          color: "rgb(52, 102, 90)",
          fontWeight: "600",
          margin: "10px ",
        }}
      >
        {editexpense ? "Edit Your Expense" : "Add Your Expense Here"}
      </div>
      <form className="form  border" onSubmit={submitHandler}>
        <div className="controll">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            required
            step="100"
            ref={inputAmountRef}
            id="amount"
          />
        </div>
        <div className="controll">
          <label>Description</label>
          <input type="text" required ref={inputDescriptionRef} />
        </div>
        <div className="controll">
          <label>Category</label>
          <select ref={inputCategoryRef}>
            {category.map((el) => (
              <option>{el}</option>
            ))}
            {/* <option>Fuel</option>
            <option>Shopping</option>
            <option>Chats</option>
            <option>Miscellaneous</option> */}
          </select>
        </div>
        <div className="actionss">
          <button className=" shadow">Add Expense</button>
          {editexpense && (
            <button className=" shadow ms-2" onClick={removeEditHandler}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
