import React, { useContext } from "react";
import AuthContex from "../store/auth-context";

const CompleteProfile = () => {
  const authCtx = useContext(AuthContex);
  const clickHandler = () => {
    authCtx.completeProfile();
  };
  return (
    <div>
      <h1>Welcome to expense tracker</h1>
      <div
        className="bg-primary  text-center py-4 px-4 shadow rounded "
        style={{ margin: " 200px auto ", width: "450px" }}
      >
        <h2 className="text-white">Your profile is incomplete</h2>
        <div>
          <button className="btn btn-success" onClick={clickHandler}>
            Complete Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
