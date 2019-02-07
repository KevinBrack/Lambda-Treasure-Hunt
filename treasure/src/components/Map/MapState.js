import React, { Component } from "react";
import "./App.css";
import graph_stats from "./data/graph_stats";
import MapContainer from "./components/Map/MapContainer";
import graph from "./data/graph";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      max_x: 0,
      min_x: 0,
      max_y: 0,
      min_y: 0,
      graph: {},
      graph_count: 0
    };
    this.min_max = graph_stats.min_max_cords;
  }
  componentDidMount() {
    this.setState({
      max_x: this.min_max[0],
      min_x: this.min_max[1],
      max_y: this.min_max[2],
      min_y: this.min_max[3],
      graph: graph_stats.graph,
      graph_count: Object.keys(graph_stats.graph).length,
      grid_cords: this.calculate_grid_size(
        this.min_max[0],
        this.min_max[1],
        this.min_max[2],
        this.min_max[3]
      )
    });
  }

  calculate_grid_size = (max_x, min_x, max_y, min_y) => {
    let x_arr = [];
    let y_arr = [];
    for (let i = min_x; i <= max_x; i++) {
      x_arr.push(i);
    }
    for (let i = min_y; i <= max_y; i++) {
      y_arr.push(i);
    }
    return { x: x_arr, y: y_arr };
  };

  render() {
    return (
      <div className="App">
        <MapContainer
          max_x={this.state.max_x}
          min_x={this.state.min_x}
          max_y={this.state.max_y}
          min_y={this.state.min_y}
          graph={this.state.graph}
          grid_coords={this.state.grid_cords}
        />
      </div>
    );
  }
}

export default App;
