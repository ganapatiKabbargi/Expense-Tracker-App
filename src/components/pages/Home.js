import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditExpense from "../EditExpense/EditExpense";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import Expenses from "../Expenses/Expenses";
import Navbar from "../Navbar/Navbar";
import { expenseActions } from "../../store/expenseSlice";
import { fetchExpenseFromFirebase } from "../../store/expense-actions";
import Notification from "../../UI/Notification";

const Home = () => {
  const verified = useSelector((state) => state.auth.user.emailVerified);
  const show = useSelector((state) => state.expense.showForm);
  const expense = useSelector((state) => state.expense.expenses);
  const notification = useSelector((state) => state.theme.Notification);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("home component RUNNING..");
    const email = localStorage.getItem("email");
    dispatch(fetchExpenseFromFirebase(email));
  }, []);

  return (
    <Fragment>
      <Navbar />
      {/* {!verified && <VerifyEmail />} */}
      {notification && <Notification />}
      {!notification && (
        <div>
          {" "}
          <ExpenseForm />
          {show && <EditExpense></EditExpense>}
          <Expenses></Expenses>
        </div>
      )}
    </Fragment>
  );
};

export default Home;
