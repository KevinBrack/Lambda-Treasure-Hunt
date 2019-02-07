import React, { Component } from "react";
import "./App.css";

import Traversal from "./components/Traversal/Traversal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graph: {},
      current_room: null,
      show_ui: true
    };
  }

  update_graph_handler = graph => {
    this.setState({ graph });
  };

  update_current_room_handler = current_room => {
    this.setState({ current_room });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Traversal
            update_graph_handler={this.update_state_handler}
            update_current_room_handler={this.update_current_room_handler}
            graph={this.state.graph}
            current_room={this.state.current_room}
            show_ui={this.state.show_ui}
          />
        </header>
      </div>
    );
  }
}

export default App;
