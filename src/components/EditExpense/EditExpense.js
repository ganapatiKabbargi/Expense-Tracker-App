import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expenseSlice";
import "./EditExpense.css";

const EditExpense = () => {
  const id = useSelector((state) => state.expense.id);
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
    } catch (err) {
      alert(err.message);
    }
  };

  const editExpenseInFirebase = async (expense) => {
    try {
      const response = await fetch(
        `https://expense-tracker-58168-default-rtdb.firebaseio.com/expenses/${id}.json`,
        {
          method: "PUT",
          body: JSON.stringify(expense),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        fetchExpenseFromFirebase();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const expense = {
      amount: inputAmountRef.current.value,
      description: inputDescriptionRef.current.value,
      category: inputCategoryRef.current.value,
    };

    editExpenseInFirebase(expense);
    dispatch(expenseActions.hideEditForm());
  };
  const clickHandler = () => {
    dispatch(expenseActions.hideEditForm());
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
