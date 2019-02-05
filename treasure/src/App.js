import React, { Component } from "react";
import "./App.css";

import Traversal from "./components/Traversal/Traversal";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Traversal />
        </header>
      </div>
    );
  }
}

export default App;
