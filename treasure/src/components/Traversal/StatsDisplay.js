import React from "react";

const StatsDisplay = props => {
  return (
    <div className="sd-container">
      Current Room: {props.stats.current_room}
      <br />
      {props.stats.rooms_visited} out of {props.stats.max_rooms} traversed
      {/* <br />
          <h3>{this.state.last_response.title}</h3> */}
      <br />
      Cooldown: {props.stats.cooldown}
    </div>
  );
};

export default StatsDisplay;
