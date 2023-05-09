import React, { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { fetchDetails } from "../store/auth-actions";
import { FaUserEdit } from "react-icons/fa";
import { ImHome } from "react-icons/im";
import { FiUpload } from "react-icons/fi";
const UpdateProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const displayName = useSelector((state) => state.auth.user.displayName);
  const photo = useSelector((state) => state.auth.user.photoUrl);
  const token = useSelector((state) => state.auth.bearerToken);

  const inputNameRef = useRef("");
  const inputImageRef = useRef("");

  const clickHandler = () => {
    setUpdate(false);
    history.push("/home");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredName = inputNameRef.current.value;
    const enteredImage = inputImageRef.current.value;

    inputNameRef.current.value = "";
    inputImageRef.current.value = "";

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCdAt2TovMTe4PkgyCuLYXvHQK7AgVi-YI",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
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
        dispatch(fetchDetails(token));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Fragment>
      <Navbar />
      <div className="d-flex">
        <div
          className="mt-5 ms-5 text-light p-4 rounded shadow "
          style={{
            background: "linear-gradient(to right, #73e8c9 , #373b44 )",
          }}
        >
          <img
            src={
              photo
                ? photo
                : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1683088795~exp=1683089395~hmac=588c6bc3752de069cc307b3030876afc10affbac4ce41af6f6e4f3dac2281c8b"
            }
            alt=""
            style={{ borderRadius: "50%", height: "300px", width: "300px" }}
            className="ms-4"
          ></img>
          <h2 className="text-center mt-5">{displayName}</h2>
          <button
            onClick={() => {
              setUpdate(true);
            }}
            className="btn w-100 mt-2 p-2 border border-success text-light fs-5 fw-bold"
          >
            Update Profile <FaUserEdit size={"30px"} className="ms-4" />
          </button>
          <button
            className="btn w-100 mt-2 p-2 border border-success text-light fs-5 "
            onClick={clickHandler}
          >
            Home <ImHome size={"30px"} className="ms-4" />
          </button>
        </div>

        {update && (
          <div
            className="bg-light w-50 h-50 mt-5 mx-auto p-4 shadow rounded text-light "
            style={{
              background: "linear-gradient( to  left , #73e8c9 , #373b44 )",
            }}
          >
            <form onSubmit={submitHandler}>
              <div className="d-flex justify-content-between ">
                <h2>Update Profile Details</h2>
                <button
                  className="btn fs-5 fw-bold"
                  onClick={() => {
                    setUpdate(false);
                  }}
                >
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
                />
              </div>
              <div>
                <button className="btn btn-outline-primary mt-2 w-25  ">
                  Update <FiUpload size={"20px"} className="ms-4" />
                </button>
                <button
                  className="btn btn-outline-success ms-5 mt-2 w-25 "
                  onClick={clickHandler}
                >
                  Back to Home <ImHome size={"20px"} className="ms-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
