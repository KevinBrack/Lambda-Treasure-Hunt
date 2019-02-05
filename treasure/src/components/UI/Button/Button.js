import "./Button.scss";

import React from "react";

const Button = props => {
  return (
    <div className="button-container">
      {props.disabled ? (
        <div className="button button-disabled">{props.text}</div>
      ) : (
        <div className="button button-enabled" onClick={props.clicky}>
          {props.text}
        </div>
      )}
    </div>
  );
};

export default Button;
