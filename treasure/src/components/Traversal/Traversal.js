import React, { Component } from "react";
import axios from "axios";

class Traversal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_room: 0,
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
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  pick_unexplored = () => {};

  move_player = () => {};

  log_traversal = () => {};

  reverse_direction = () => {};

  render() {
    return <div>TRAVERSAL</div>;
  }
}

export default Traversal;
