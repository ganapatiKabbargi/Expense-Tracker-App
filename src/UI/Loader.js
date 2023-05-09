import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className="loading-spinner">
      <div className="loading-spinner-inner">
        <div className="loading-spinner-circle"></div>
        <div className="loading-spinner-circle"></div>
        <div className="loading-spinner-circle"></div>
        <div className="loading-spinner-circle"></div>
        <div className="loading-spinner-circle"></div>
      </div>
    </div>
  );
};

export default Loader;
