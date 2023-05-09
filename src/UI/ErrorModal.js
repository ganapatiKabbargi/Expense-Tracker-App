import React from "react";
import Modal from "./modal/Modal";
import "./ErrorModal.css";

const ErrorModal = (props) => {
  let errorMesssage = "";
  if (props.message.includes("EMAIL")) {
    errorMesssage = "Please Enter Valid Email";
  } else if (props.message.includes("PASSWORD")) {
    errorMesssage = "Please Enter Valid Password";
  } else if (props.message.includes("match")) {
    errorMesssage = "Password not matched";
  } else if (props.message.includes("INTERNET")) {
    errorMesssage = "Please check your internet connection";
  } else {
    errorMesssage = "Something Went Wrong";
  }

  const clickHandler = () => {
    props.errorHandler();
  };
  return (
    <React.Fragment>
      {/* <Modal /> */}
      <div className="card">
        <div className="header">
          <div className="image">
            <svg
              className="svg"
              aria-hidden="true"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
          </div>
          <div className="content">
            <span className="titlee">{props.message}</span>
            <p className="message">{errorMesssage}</p>
          </div>
          <div className="actionssss">
            {/* <button className="desactivate" type="button">
              Desactivate
            </button> */}
            <button className="cancel" type="button" onClick={clickHandler}>
              OK
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ErrorModal;
