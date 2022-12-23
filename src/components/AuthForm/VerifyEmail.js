import React from "react";
import { useSelector } from "react-redux";

const VerifyEmail = () => {
  const token = useSelector((state) => state.auth.bearerToken);
  const clickHandler = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAbpLNr_eEETNGNveU64MVJ1lJtYvkP9bM",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          let errorMesssage = "Verification Failed";
          throw new Error(errorMesssage);
        }
      })
      .then((data) => {
        alert("verification link is sent on mail click to verify");
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="text-center mt-5 ">
      <button className="btn btn-outline-primary w-50" onClick={clickHandler}>
        Verify Email to Continue
      </button>
    </div>
  );
};

export default VerifyEmail;
