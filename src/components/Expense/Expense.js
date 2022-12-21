import React, { Fragment, useContext } from "react";
import AuthContex from "../../store/auth-context";

const Expense = (props) => {
  const authCtx = useContext(AuthContex);
  const removeHandler = () => {
    authCtx.removeExpense(props.id);
  };

  const editHandler = () => {
    authCtx.showEdit(props.id);
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
