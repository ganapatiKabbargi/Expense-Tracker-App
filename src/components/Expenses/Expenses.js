import React, { useContext } from "react";
import AuthContex from "../../store/auth-context";
import Expense from "../Expense/Expense";

const Expenses = () => {
  const authCtx = useContext(AuthContex);
  let total = 0;
  let expensess = authCtx.expenses.map((expense) => {
    total = total + +expense.amount;
    return (
      <Expense
        key={expense.id}
        amount={expense.amount}
        description={expense.description}
        category={expense.category}
      ></Expense>
    );
  });
  return (
    <div
      className=" m-auto rounded shadow p-2"
      style={{ width: "900px", backgroundColor: "#c22838" }}
    >
      <div className="d-flex justify-content-around  w-100 m-auto my-2 p-2 rounded  fs-4 text-white">
        <div>description</div>
        <div>category</div>
        <div>amount</div>
      </div>
      {expensess}
      <div
        className=" text-center fs-4 text-white rounded m-auto px-4 "
        style={{ width: "300px", backgroundColor: "#e64738" }}
      >
        Total Expense: {total}
      </div>
    </div>
  );
};

export default Expenses;
