import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { themeActions } from "../../store/themeSlice";
import Expense from "../Expense/Expense";
import Loader from "../../UI/Loader";
import Wallet from "../Wallet/Wallet";

const Expenses = () => {
  const expenses = useSelector((state) => state.expense.expenses);
  const loader = useSelector((state) => state.theme.loader);
  const [color, setColor] = useState();
  const dispatch = useDispatch();

  let expenseList;
  expenseList = expenses.length === 0 ? false : true;
  let total = 0;
  // let balance = 50000;

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
    let t = +total / 500;
    if (t < 60) {
      setColor("green");
    } else if (t > 60 && t < 80) {
      setColor("orange");
    } else {
      setColor("#d62a2a");
    }
  }, [total]);

  return (
    <Fragment>
      <div
        style={{
          width: "600px",
          height: "80vh",
          padding: "20px",
          // borderRadius: "10px",
        }}
      >
        <Wallet total={total} color={color} />
        <section
          style={{
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0,0,0,.3)",
            margin: "20px 0px",
            backgroundColor: "#141e30",
          }}
        >
          <div style={{ marginTop: "10px", marginBottom: "20px" }}>
            <span
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "white",
              }}
            >
              History
            </span>
          </div>
          {loader && <Loader />}
          {!loader && (
            <div
              className="border p-2 rounded"
              style={{ height: "300px", overflow: "auto" }}
            >
              {!expenseList && (
                <h4 className=" text-center py-5">
                  No expenses to show please add expenses
                </h4>
              )}
              {expenseList && <div>{expensess}</div>}
            </div>
          )}
        </section>
      </div>
    </Fragment>
  );
};

export default Expenses;
