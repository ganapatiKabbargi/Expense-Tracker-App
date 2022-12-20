import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Signup.css";
const PasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const inputEmailRef = useRef("");
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const enteredEmail = inputEmailRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAbpLNr_eEETNGNveU64MVJ1lJtYvkP9bM",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enteredEmail,
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
          return response.json().then((data) => {
            let errorMesssage = "resetting password failed";
            throw new Error(errorMesssage);
          });
        }
      })
      .then((data) => {
        alert("Link has been sent to your mail reset the password");
        history.replace("/auth");
      })
      .catch((err) => {
        alert(err.messsage);
      });
  };
  return (
    <div className="form-div shadow bg-light">
      <form onSubmit={submitHandler}>
        <div className="control">
          <label className="text-success">Enter Your Email</label>
          <input type="email" required ref={inputEmailRef} />
        </div>
        <button className="btn bg-success text-white w-100">
          {loading ? "sending Link to mail" : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;
