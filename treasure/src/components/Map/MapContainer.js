import React from "react";
import MapNode from "./MapNode";
import { Grid, Cell } from "styled-css-grid";
import "./MapContainer.scss";

const MyGrid = (width, height) => {
  let cord_permutations = [];
  for (let i = 0; i < width.length; i++) {
    for (let j = 0; j < height.length; j++) {
      cord_permutations.push(
        <MapNode
          className={"node " + width[i] + height[j]}
          active={false}
          x={width[i]}
          y={height[j]}
        />
      );
    }
  }
  return (
    <Grid columns={height.length} gap="2px">
      {cord_permutations.map((item, index) => (
        <Cell key={index} cords={item}>
          {item}
        </Cell>
      ))}
    </Grid>
  );
};

const MapContainer = props => {
  return (
    <div className="map-container">
      MAP CONTAINER
      <br />
      {props.grid_coords
        ? MyGrid(props.grid_coords.x, props.grid_coords.y)
        : null}
    </div>
  );
};

export default MapContainer;
