import React, { Fragment, useContext } from "react";
import AuthContex from "../../store/auth-context";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  const authCtx = useContext(AuthContex);
  const clickHandler = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAbpLNr_eEETNGNveU64MVJ1lJtYvkP9bM",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: authCtx.token,
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
    <Fragment>
      <Navbar />
      <div className="text-center mt-5 ">
        {!authCtx.verified && (
          <button
            className="btn btn-outline-primary w-50"
            onClick={clickHandler}
          >
            Verify Email
          </button>
        )}
      </div>
    </Fragment>
  );
};

export default Home;
