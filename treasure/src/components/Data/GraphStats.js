import graph from "./graph";

const graph_stats = {};

const graph_arr = function(graph) {
  const all_cords = [];
  for (var k in graph) {
    if (graph.hasOwnProperty(k)) {
      all_cords.push(graph[k].coordinates);
    }
  }
  return all_cords;
};

const GraphArr = graph_arr(graph);

const min_max_cords = function(GraphArr) {
  const result = [
    Number(GraphArr[0][0]),
    Number(GraphArr[0][0]),
    Number(GraphArr[0][1]),
    Number(GraphArr[0][1])
  ];
  for (let i = 1; i < GraphArr.length; i++) {
    if (GraphArr[i][0] > result[0]) {
      result[0] = GraphArr[i][0];
    }
    if (GraphArr[i][0] < result[1]) {
      result[1] = GraphArr[i][0];
    }
    if (GraphArr[i][1] > result[2]) {
      result[2] = GraphArr[i][1];
    }
    if (GraphArr[i][1] < result[3]) {
      result[3] = GraphArr[i][1];
    }
  }
  return result;
};

graph_stats.all_cords = graph_arr(graph);
graph_stats.min_max_cords = min_max_cords(GraphArr);
graph_stats.graph = graph;

export default graph_stats;
