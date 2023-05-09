import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expenseSlice";
import { editExpenseInFirebase } from "../../store/expense-actions";
import Modal from "../../UI/modal/Modal";
import "./EditExpense.css";

const EditExpense = () => {
  const id = useSelector((state) => state.expense.id);
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
    dispatch(expenseActions.hideEditForm());
    dispatch(editExpenseInFirebase(expense, email, id));
  };

  const clickHandler = () => {
    dispatch(expenseActions.hideEditForm());
  };

  const backdropHandler = () => {
    dispatch(expenseActions.hideEditForm());
  };
  return (
    <React.Fragment>
      <Modal onConfirm={backdropHandler} />
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
            <button className="btn shadow">Add Expense</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};
export default EditExpense;
