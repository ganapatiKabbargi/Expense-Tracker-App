import React from "react";
import classes from "./Wallet.module.css";

const Wallet = (props) => {
  let balance = 50000;

  return (
    <section className={classes.section}>
      <div className={classes.wallet}>
        <div className={classes.wallet_heading}>Wallet </div>
        <div className={classes.balance}>Balance : {balance - props.total}</div>
        <div className={classes.expense}>TotalExpense : {props.total}</div>
      </div>
      <div className={classes.progress}>
        <span
          style={{
            height: "8px",
            width: `${props.total / 500}%`,
            backgroundColor: `${props.color}`,
            display: "block",
          }}
        ></span>
      </div>
    </section>
  );
};

export default Wallet;
