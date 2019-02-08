import React from "react";
import "./StatsDisplay.scss";

const StatsDisplay = props => {
  return (
    <div className="sd-container">
      <div>Current Room: {props.stats.current_room}</div>
      <div>
        {props.stats.rooms_visited} out of {props.stats.max_rooms} traversed
      </div>
      <div>Cooldown: {props.stats.cooldown}</div>
    </div>
  );
};

export default StatsDisplay;
