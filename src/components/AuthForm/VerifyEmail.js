import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { fetchDetails } from "../../store/auth-actions";
import Loader from "../../UI/Loader";

const VerifyEmail = () => {
  const token = useSelector((state) => state.auth.bearerToken);
  const verified = useSelector((state) => state.auth.user.emailVerified);
  // const verified = localStorage.getItem("verified");
  // const email = useSelector((state) => state.auth.email);
  const loader = useSelector((state) => state.theme.loader);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (verified) {
      history.replace("/home");
    }
  });

  const clickHandler = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCdAt2TovMTe4PkgyCuLYXvHQK7AgVi-YI",
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

  const verifiedHandler = () => {
    dispatch(fetchDetails(token));
  };
  return (
    <Fragment>
      <Navbar />
      {loader && <Loader />}
      {!loader && (
        <div
          className="text-center mt-5 shadow bg-light py-3 "
          style={{
            width: "600px",
            borderRadius: "20px",
            marginLeft: "450px",
          }}
        >
          <h5 className="text-secondary">
            You need to verify your email to continue
          </h5>
          <button
            className="btn btn-outline-primary my-2"
            onClick={clickHandler}
          >
            Verify Email to Continue
          </button>
          <h5 className="text-secondary">
            After verifying your Email click here to continue
          </h5>
          <button className="btn btn-success my-2" onClick={verifiedHandler}>
            Click here to continue
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default VerifyEmail;
