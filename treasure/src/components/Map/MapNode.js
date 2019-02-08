import React from "react";
import "./MapNode.scss";

const find_me = (graph, x, y) => {
  for (let key in graph) {
    let current_test = [String(x), String(y)];
    let current_cords = graph[key].coordinates;
    if (current_cords[0] == current_test[0]) {
      if (current_cords[1] == current_test[1]) {
        console.log("FOUND MYSELF!");
        return { key: key, node: graph[key] };
      }
    }
  }
  return null;
};

const MapNode = props => {
  const class_list = ["m-node"];
  let graph = props.graph;
  let current_room = props.current_room;
  let x = props.x;
  let y = props.y;

  // Check if a room exists at these coords
  let found_me = find_me(graph, x, y);
  if (found_me !== null) {
    class_list.push("m-node-exists");

    if (graph[found_me.key].n !== "?" && graph[found_me.key].n !== "-") {
      class_list.push("m-node-n-connected");
    }
    if (graph[found_me.key].e !== "?" && graph[found_me.key].e !== "-") {
      class_list.push("m-node-e-connected");
    }
    if (graph[found_me.key].s !== "?" && graph[found_me.key].s !== "-") {
      class_list.push("m-node-s-connected");
    }
    if (graph[found_me.key].w !== "?" && graph[found_me.key].w !== "-") {
      class_list.push("m-node-w-connected");
    }

    if (found_me.key == current_room) {
      class_list.push("m-node-active");
    }
  }

  return (
    <div className="map-node-container">
      <div className={class_list.join(" ")}>
        {found_me !== null ? found_me.key : null}
      </div>
    </div>
  );
};

export default MapNode;
