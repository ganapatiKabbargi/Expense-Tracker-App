import React from "react";
import "./Toggle.css";
const Toggle = (props) => {
  const clickHandler = () => {
    props.theme();
  };
  return (
    <div>
      <label class="switch">
        <input type="checkbox" onClick={clickHandler} />
        <span class="slider"></span>
      </label>
    </div>
  );
};

export default Toggle;
