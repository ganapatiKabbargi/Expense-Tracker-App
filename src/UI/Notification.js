import React from "react";
import "./Notification.css";
import Modal from "./modal/Modal";
import { useDispatch } from "react-redux";
import { themeActions } from "../store/themeSlice";

const Notification = (props) => {
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(themeActions.hideNotification());
  };
  return (
    <React.Fragment>
      {/* <Modal /> */}

      <div className="card">
        <div className="header">
          <div className="image">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M20 7L9.00004 18L3.99994 13"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </div>
          <div className="content">
            <span className="title"> Successfully Logged in</span>
            <p className="message">
              You are Successfully logged In... Click on OK to continue
            </p>
          </div>
          <div className="actionsss">
            <button className="history" type="button" onClick={clickHandler}>
              OK
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Notification;
