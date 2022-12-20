import React, { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import AuthContex from "../store/auth-context";

const UpdateProfile = () => {
  const authCtx = useContext(AuthContex);
  const history = useHistory();

  const inputNameRef = useRef("");
  const inputImageRef = useRef("");

  const clickHandler = () => {
    history.push("/home");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredName = inputNameRef.current.value;
    const enteredImage = inputImageRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAbpLNr_eEETNGNveU64MVJ1lJtYvkP9bM",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          displayName: enteredName,
          photoUrl: enteredImage,
          deleteAttribute: [],
          returnSecureToken: true,
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
          let errorMesssage = "Authentication Failed";
          throw new Error(errorMesssage);
        }
      })
      .then((data) => {
        console.log(data);
        alert("profile updated successfully");
        // history.push("/home");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="bg-light w-50 mt-5 mx-auto p-4 shadow rounded ">
      <form onSubmit={submitHandler}>
        <div className="d-flex justify-content-between ">
          <h2>Contact Details</h2>
          <button className="btn btn-outline-primary" onClick={clickHandler}>
            X
          </button>
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            required
            ref={inputNameRef}
            defaultValue={authCtx.displayName}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Image Url
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            required
            ref={inputImageRef}
            defaultValue={authCtx.imageUrl}
          />
        </div>
        <div>
          <button className="btn btn-outline-primary mt-2 w-25">Update</button>
          <button
            className="btn btn-outline-success ms-5 mt-2 w-25"
            onClick={clickHandler}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
