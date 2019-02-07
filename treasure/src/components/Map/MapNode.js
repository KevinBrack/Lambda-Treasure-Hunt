import React from "react";
import "./MapNode.scss";

const MapNode = props => {
  return (
    <div className="m-node">
      {props.x}, {props.y}
    </div>
  );
};

export default MapNode;
