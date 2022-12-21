import React, { Fragment, useContext } from "react";
import AuthContex from "../../store/auth-context";
import VerifyEmail from "../AuthForm/VerifyEmail";
import EditExpense from "../EditExpense/EditExpense";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import Expenses from "../Expenses/Expenses";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  const authCtx = useContext(AuthContex);
  return (
    <Fragment>
      <Navbar />
      {!authCtx.verified && <VerifyEmail />}
      {authCtx.verified && <ExpenseForm />}
      {authCtx.edit && <EditExpense></EditExpense>}
      {authCtx.verified && <Expenses></Expenses>}
    </Fragment>
  );
};

export default Home;
