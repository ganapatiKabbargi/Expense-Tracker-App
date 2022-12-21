import React, { useContext, useRef } from "react";
import AuthContex from "../../store/auth-context";
import "./EditExpense.css";

const EditExpense = () => {
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

    authCtx.editExpense(expense);
  };
  const clickHandler = () => {
    authCtx.hideEdit();
  };
  return (
    <div className="edit-div shadow ">
      <div className="d-flex justify-content-between">
        <h2 className="text-center">Edit Expense</h2>
        <button className="btn btn-outline-light" onClick={clickHandler}>
          X
        </button>
      </div>
      <form onSubmit={submitHandler}>
        <div className="contro">
          <label>Amount</label>
          <input type="number" required step="100" ref={inputAmountRef} />
        </div>
        <div className="contro">
          <label>Description</label>
          <input type="text" required ref={inputDescriptionRef} />
        </div>
        <div className="contro">
          <label>category</label>
          <select ref={inputCategoryRef}>
            <option>fuel</option>
            <option>shopping</option>
            <option>Chats</option>
            <option>miscellaneous</option>
          </select>
        </div>
        <div className="action">
          <button className="btn btn-primary ">Add Expense</button>
        </div>
      </form>
    </div>
  );
};
export default EditExpense;
