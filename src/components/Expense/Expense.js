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
        className="d-flex justify-content-between w-100 m-auto my-2 p-2 rounded shadow text-white fs-5"
        style={{
          background: "linear-gradient(to top left, #141e30 , #243b55 )",
        }}
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
          <button className="btn text-success me-2" onClick={editHandler}>
            <FaEdit size={"23px"} />
          </button>
          <button
            className="btn  me-2 "
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
