
import {
  GRAPH_CIRCLE_RADIUS,
} from "../d3-elements";


const getLinks = (adjacentMatrix: number[][], verticesNames: string[]) => {
  const links = [];
  for (let i = 0; i < adjacentMatrix.length; i++) {
    for (let j = 0; j < adjacentMatrix[i].length; j++) {
      if (adjacentMatrix[i][j] === 1) {
        links.push({ source: verticesNames[i], target: verticesNames[j], id: `${verticesNames[i]}-${verticesNames[j]}` });
      }
    }
  }
  return links;
};

export const getGraphFromAdjacencyMatrix = (adjacentMatrix: number[][], verticesNames: string[]) => {
  const nodes = adjacentMatrix.map((row, i) => ({
    id: i,
    name: verticesNames[i],
    x: (i % 3) * (GRAPH_CIRCLE_RADIUS * 3) + GRAPH_CIRCLE_RADIUS + 5,
    y: Math.floor(i / 3) * (GRAPH_CIRCLE_RADIUS * 3) + GRAPH_CIRCLE_RADIUS + 5,
  }));

  const links = getLinks(adjacentMatrix, verticesNames);

  // const linksCountsByNames = verticesNames.reduce<Record<string, number>>((acc, name, index) => {
  //   acc[name] = adjacentMatrix[index].filter((value) => value > 0).length;
  //   return acc;
  // }, {});

  return { nodes, links };
};