
import {
  GRAPH_CIRCLE_RADIUS,
} from "../d3-elements";

export const getGraphFromAdjacencyMatrix = (adjacentMatrix: number[][]) => {
  const nodes = adjacentMatrix.map((row, i) => ({
    id: i,
    name: String(i),
    x: (i % 3) * (GRAPH_CIRCLE_RADIUS * 3) + GRAPH_CIRCLE_RADIUS + 5,
    y: Math.floor(i / 3) * (GRAPH_CIRCLE_RADIUS * 3) + GRAPH_CIRCLE_RADIUS + 5,
  }));

  const links = [];

  for (let i = 0; i < adjacentMatrix.length; i++) {
    for (let j = 0; j < adjacentMatrix[i].length; j++) {
      if (adjacentMatrix[i][j] === 1) {
        links.push({ source: i, target: j });
      }
    }
  }

  return { nodes, links };
};