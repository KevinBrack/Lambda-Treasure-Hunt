import React, { Component } from "react";
import axios from "axios";
import ReactTimeout from "react-timeout";
import Button from "../UI/Button/Button";

class Traversal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_room: null,
      exits: [],
      coordinates: "",
      cooldown: null,
      cooldown_cleared: true,
      visited_rooms: {},
      current_path: [],
      traversal_path: [],
      num_explored: 1,
      last_response: {},
      config: {
        headers: {
          "Content-Type": "application/json",
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
        this.update_state(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  request_travel = direction => {
    const config = this.state.config;
    const data = { direction: direction };
    let url = "https://lambda-treasure-hunt.herokuapp.com/api/adv/move/";
    // console.log("axios.post(", url, ", ", data, ", ", config, ")"); // <-- Debugging
    return axios
      .post(url, data, config)
      .then(res => {
        this.update_state(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  update_state = res => {
    console.log("RESPONSE: ", res);
    if ("room_id" in res) {
      this.setState({
        last_response: res,
        current_room: res.room_id,
        exits: res.exits,
        coordinates: res.coordinates,
        cooldown: res.cooldown,
        cooldown_cleared: false
      });
      this.handle_cooldown(res.cooldown);
    } else {
      this.setState({
        last_response: res
      });
    }
  };

  pick_unexplored = () => {
    let exits = this.state.exits.slice();
    let current = this.state.current_room;
    let visited_rooms = { ...this.state.visited_rooms };
    let unexplored = [];
    let directions = ["n", "s", "e", "w"];

    // check if current room has object in visited
    // if not, create it
    if (current in visited_rooms) {
    } else {
      visited_rooms[current] = { n: "?", s: "?", w: "?", e: "?" };
    }

    for (let i = 0; i < directions.length; i++) {
      if (exits.includes(directions[i])) {
        if (visited_rooms[current][directions[i]] === "?") {
          unexplored.push(directions[i]);
        }
      } else {
        visited_rooms[current][directions[i]] = "-";
      }
    }

    this.setState({ visited_rooms });

    if (unexplored.length === 0) {
      return null;
    } else {
      return unexplored[Math.floor(Math.random(unexplored.length))];
    }
  };

  move_player = () => {
    let current_room = this.state.current_room;
    let direction = this.pick_unexplored();
    // console.log("Direction: ", direction); // <-- Debugging
    let current_path = this.state.current_path.slice();
    if (direction === null) {
      direction = this.reverse_direction(current_path.pop());
      this.setState({ current_path: current_path });
    } else {
      current_path.push(direction);
      this.setState({ current_path: current_path });
    }

    this.request_travel(direction).then(() => {
      console.log(
        "Current: ",
        current_room,
        " Next: ",
        this.state.current_room
      );
      if (current_room !== this.state.current_room) {
        // Checking if we have a new current room
        let next_room = this.state.current_room;
        this.log_travel(current_room, next_room, direction);
      } else {
        console.log("Something went wrong, you did not move");
      }
    });
  };

  log_travel = (current_room, next_room, direction) => {
    let traversal_path = this.state.traversal_path.slice();
    let visited_rooms = { ...this.state.visited_rooms };
    let num_explored = this.state.num_explored;

    traversal_path.push(direction);
    if (next_room in visited_rooms) {
    } else {
      visited_rooms[next_room] = { n: "?", s: "?", w: "?", e: "?" };
      num_explored++;
    }
    visited_rooms[current_room][direction] = next_room;
    visited_rooms[next_room][this.reverse_direction(direction)] = current_room;

    this.setState({ traversal_path, visited_rooms, num_explored });
  };

  reverse_direction = direction => {
    if (direction === "n") {
      return "s";
    }
    if (direction === "s") {
      return "n";
    }
    if (direction === "w") {
      return "e";
    }
    if (direction === "e") {
      return "w";
    }
  };

  handle_cooldown = time => {
    this.props.setTimeout(this.clear_cooldown, time * 1000);
  };

  clear_cooldown = () => {
    this.setState({ cooldown_cleared: true });
  };

  handle_move_click = () => {
    this.move_player();
  };

  render() {
    return (
      <div className="traversal-container">
        <div>TRAVERSAL</div>
        <Button
          text="Move"
          clicky={this.handle_move_click}
          disabled={!this.state.cooldown_cleared}
        />
      </div>
    );
  }
}

export default ReactTimeout(Traversal);
