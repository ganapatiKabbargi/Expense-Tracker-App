import React, { Fragment, useContext } from "react";
import { useDispatch } from "react-redux";
import { expenseActions } from "../../store/expenseSlice";

const Expense = (props) => {
  const dispatch = useDispatch();

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

  const removeExpenseFromFirebase = async (id) => {
    try {
      const response = await fetch(
        `https://expense-tracker-58168-default-rtdb.firebaseio.com/expenses/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        fetchExpenseFromFirebase();
      }
      const data = response.json();
      console.log("expense deleted successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  const removeHandler = () => {
    removeExpenseFromFirebase(props.id);
  };

  const editHandler = () => {
    dispatch(expenseActions.showEditForm());
    dispatch(expenseActions.setId(props.id));
  };
  return (
    <Fragment>
      <div
        className="d-flex justify-content-between w-100 m-auto my-2 p-2 rounded shadow text-white fs-5"
        style={{ backgroundColor: "#e64738" }}
      >
        <div className=" ms-2" style={{ width: "200px" }}>
          {props.description}
        </div>
        <div className="ms-5" style={{ width: "200px" }}>
          {props.category}
        </div>
        <div className="ms-5" style={{ width: "200px" }}>
          {props.amount}
        </div>
        <div>
          <button className="btn btn-success me-2" onClick={editHandler}>
            Edit
          </button>
          <button
            className="btn btn-secondary me-2"
            style={{ backgroundColor: "" }}
            onClick={removeHandler}
          >
            Delete
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Expense;
