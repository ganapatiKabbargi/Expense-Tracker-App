import React, { Fragment } from "react";

const Expense = (props) => {
  return (
    <Fragment>
      <div
        className="d-flex justify-content-around w-100 m-auto my-2 p-2 rounded shadow text-white fs-5"
        style={{ backgroundColor: "#e64738" }}
      >
        <div>{props.description}</div>
        <div>{props.category}</div>
        <div>{props.amount}</div>
      </div>
    </Fragment>
  );
};

export default Expense;
