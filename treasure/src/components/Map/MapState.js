import React, { Component } from "react";
import graph_stats from "../Data/GraphStats";
import MapContainer from "./MapContainer";

class MapState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graph_stats: {}
    };
  }

  componentWillReceiveProps() {
    if (this.props.graph !== {}) {
      console.log("CWRP PROPS GRAPH: ", this.props.graph);
      let temp_stats = graph_stats(this.props.graph);
      this.setState({ graph_stats: temp_stats });
    }
  }

  render() {
    return (
      <div className="App">
        <MapContainer
          graph_stats={this.state.graph_stats}
          graph={this.props.graph}
          grid_coords={this.state.graph_stats.grid_size}
        />
      </div>
    );
  }
}

export default MapState;
