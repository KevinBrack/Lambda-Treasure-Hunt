import React, { Component } from "react";

class Traversal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_room: 0,
      visited_rooms: {
        0: { n: "?", s: "?", w: "?", e: "?" }
      },
      current_path: [],
      num_explored: 1
    };
  }
  render() {
    return <div />;
  }
}

export default Traversal;
