import React, { Component } from "react";
import axios from "axios";

class Traversal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_room: 0,
      exits: {},
      coordinates: "",
      cooldown: 0,
      visited_rooms: {
        0: { n: "?", s: "?", w: "?", e: "?" }
      },
      current_path: [],
      num_explored: 1,
      last_response: {},
      config: {
        headers: {
          Authorization: "Token " + process.env.REACT_APP_API_KEY
        }
      }
    };
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    const config = this.state.config;
    let url = "https://lambda-treasure-hunt.herokuapp.com/api/adv/init/";
    axios
      .get(url, config)
      .then(res => {
        // console.log(res.data); // <-- Debugging
        this.setState({ last_response: res.data });
        this.update_state(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  update_state = res => {
    if ("room_id" in res) {
      this.setState({
        current_room: res.room_id,
        exits: res.exits,
        coordinates: res.coordinates,
        cooldown: res.cooldown
      });
    }
  };

  pick_unexplored = () => {
    let exits = this.state.exits;
    let current = this.state.current_room;
    let visited = this.state.visited_rooms;
    let unexplored = [];
    let directions = ["n", "s", "e", "w"];

    for (let i = 0; i < directions.length; i++) {
      if (directions[i] in exits) {
        if (visited[current][directions[i]] === "?") {
          unexplored.push(directions[i]);
        }
      } else {
        visited[current][directions[i]] = "-";
      }
    }

    this.setState({ visited: visited });

    if (unexplored.length === 0) {
      return null;
    } else {
      return unexplored[Math.floor(Math.random(unexplored.length))];
    }
  };

  move_player = () => {};

  log_traversal = () => {};

  reverse_direction = () => {};

  render() {
    return <div>TRAVERSAL</div>;
  }
}

export default Traversal;
