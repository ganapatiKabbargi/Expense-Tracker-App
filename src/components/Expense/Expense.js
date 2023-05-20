import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expenseSlice";
import { removeExpenseFromFirebase } from "../../store/expense-actions";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
const Expense = (props) => {
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();

  const removeHandler = () => {
    dispatch(removeExpenseFromFirebase(props.id, email));
  };

  const editHandler = () => {
    dispatch(expenseActions.showEditForm());
    dispatch(expenseActions.setId(props.id));
  };
  return (
    <Fragment>
      <li
        className="d-flex justify-content-between w-100 mx-auto  px-2   fs-5"
        style={{
          margin: "10px 0px",
          borderLeft: "4px solid #43cea2",
        }}
      >
        <div className=" ms-2 fw-bold" style={{ width: "100px" }}>
          <div style={{ fontWeight: "600", color: "#43aea2" }}>
            {props.description}
          </div>
          <div style={{ fontSize: "13px", fontWeight: "600", color: "white" }}>
            {props.category}
          </div>
        </div>

        <div style={{ width: "100px", color: "white" }}>{props.amount}</div>
        <div>
          <button className="btn text-success me-2" onClick={editHandler}>
            <FaEdit size={"23px"} />
          </button>
          <button
            className="btn  me-2 border-0"
            style={{ color: " #e63838" }}
            onClick={removeHandler}
          >
            <MdDelete size={"23px"} />
          </button>
        </div>
      </li>
    </Fragment>
  );
};

export default Expense;
