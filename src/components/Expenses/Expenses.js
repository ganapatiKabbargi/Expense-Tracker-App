import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { themeActions } from "../../store/themeSlice";
import Expense from "../Expense/Expense";
import Loader from "../../UI/Loader";

const Expenses = () => {
  const expenses = useSelector((state) => state.expense.expenses);
  const loader = useSelector((state) => state.theme.loader);
  const dispatch = useDispatch();

  let expenseList;
  expenseList = expenses.length === 0 ? false : true;
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

  useEffect(() => {
    if (total > 10000) {
      dispatch(themeActions.premium());
      localStorage.setItem(localStorage.getItem("email") + "prime", true);
    }
  }, [total]);

  return (
    <Fragment>
      (
      <div
        className=" m-auto rounded shadow p-2"
        style={{
          width: "900px",
          height: "100%",
          background: "linear-gradient(to right, #43cea2 , #185a9d )",
        }}
      >
        {loader && <Loader />}
        {!loader && (
          <div>
            {!expenseList && (
              <h4 className="text-white text-center py-5">
                No expenses to show please add expenses
              </h4>
            )}
            {expenseList && (
              <div>
                <div
                  className="d-flex justify-content-start  w-100  my-2 p-2 rounded  fs-4 text-white shadow"
                  style={{
                    width: "900px",
                    background:
                      "linear-gradient(to top left, #2b5876 , #4e4376 )",
                  }}
                >
                  <div className="me-5 ">Description</div>
                  <div className="me-5 ms-5 ps-5">Category</div>
                  <div className="me-5  ms-5 ps-5">Amount</div>
                </div>
                {expensess}
                <div
                  className=" text-center fs-4 text-white rounded m-auto px-4 "
                  style={{
                    width: "300px",
                    background:
                      "linear-gradient(to top left, #141e30 , #243b55 )",
                  }}
                >
                  Total Expense: {total}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      )
    </Fragment>
  );
};

export default Expenses;
