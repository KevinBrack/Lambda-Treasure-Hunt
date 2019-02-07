const graph_stats = graph => {
  let result = {};
  let graph_arr_result = graph_arr(graph);
  result.min_max_cords = min_max_cords(graph_arr_result);
  result.graph_arr = graph_arr_result;
  result.arrays = calculate_grid_size(
    result.min_max_cords.max_x,
    result.min_max_cords.min_x,
    result.min_max_cords.max_y,
    result.min_max_cords.min_y
  );

  console.log(result); // <-- Debugging
  return result;
};

const graph_arr = function(graph) {
  const all_cords = [];
  for (var k in graph) {
    if (graph.hasOwnProperty(k)) {
      all_cords.push(graph[k].coordinates);
    }
  }
  return all_cords;
};

const min_max_cords = function(GraphArr) {
  const result = {
    max_x: Number(GraphArr[0][0]),
    min_x: Number(GraphArr[0][0]),
    max_y: Number(GraphArr[0][1]),
    min_y: Number(GraphArr[0][1])
  };
  for (let i = 1; i < GraphArr.length; i++) {
    if (GraphArr[i][0] > result.max_x) {
      result.max_x = GraphArr[i][0];
    }
    if (GraphArr[i][0] < result.min_x) {
      result.min_x = GraphArr[i][0];
    }
    if (GraphArr[i][1] > result.max_y) {
      result.max_y = GraphArr[i][1];
    }
    if (GraphArr[i][1] < result.min_y) {
      result.min_y = GraphArr[i][1];
    }
  }
  return result;
};

let calculate_grid_size = (max_x, min_x, max_y, min_y) => {
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

export default graph_stats;
