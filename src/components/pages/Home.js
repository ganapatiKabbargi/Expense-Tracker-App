import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import VerifyEmail from "../AuthForm/VerifyEmail";
import EditExpense from "../EditExpense/EditExpense";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import Expenses from "../Expenses/Expenses";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  const verified = useSelector((state) => state.auth.isVerified);
  const show = useSelector((state) => state.expense.showForm);
  return (
    <Fragment>
      <Navbar />
      {!verified && <VerifyEmail />}
      {verified && <ExpenseForm />}
      {show && <EditExpense></EditExpense>}
      {verified && <Expenses></Expenses>}
    </Fragment>
  );
};

export default Home;
