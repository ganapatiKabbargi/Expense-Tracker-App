import React, { Fragment, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { expenseActions } from "../../store/expenseSlice";
import { themeActions } from "../../store/themeSlice";

import Expense from "../Expense/Expense";

const Expenses = () => {
  // const authCtx = useContext(AuthContex);
  const expenses = useSelector((state) => state.expense.expenses);
  const toggle = useSelector((state) => state.theme.toggle);
  const dispatch = useDispatch();
  let total = 0;

  let expensess = expenses.map((expense) => {
    total = total + +expense.amount;
    return (
      <Expense
        key={expense.id}
        id={expense.id}
        amount={expense.amount}
        description={expense.description}
        category={expense.category}
      ></Expense>
    );
  });
  if (total > 10000) {
    dispatch(themeActions.premium());
  } else {
    dispatch(themeActions.nonPrime());
  }

  return (
    <Fragment>
      <div
        className=" m-auto rounded shadow p-2"
        style={{ width: "900px", backgroundColor: "#c22838" }}
      >
        <div className="d-flex justify-content-start  w-50  my-2 p-2 rounded  fs-4 text-white">
          <div className="me-5">description</div>
          <div className="me-5 ms-5 ps-5">category</div>
          <div className="me-5  ms-5 ps-5">amount</div>
        </div>
        {expensess}
        <div
          className=" text-center fs-4 text-white rounded m-auto px-4 "
          style={{ width: "300px", backgroundColor: "#e64738" }}
        >
          Total Expense: {total}
        </div>
      </div>
    </Fragment>
  );
};

export default Expenses;
