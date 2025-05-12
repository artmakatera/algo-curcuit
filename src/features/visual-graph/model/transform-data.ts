
import { VertexBaseData } from "@/shared/types/data-structures";
import {
  GRAPH_CIRCLE_RADIUS,
} from "../d3-elements";
import { hasGraphEdge } from "@/features/visual-graph-editor";


const getLinks = (adjacentMatrix: number[][], vertices: VertexBaseData[]) => {
  const links = [];
  for (let i = 0; i < adjacentMatrix.length; i++) {
    for (let j = 0; j < adjacentMatrix[i].length; j++) {
      if (hasGraphEdge(adjacentMatrix[i][j])) {
        const source = vertices[i].id;
        const target = vertices[j].id;

        links.push({ source, target, id: `${source}-${target}` });
      }
    }
  }
  return links;
};

export const getGraphFromAdjacencyMatrix = (adjacentMatrix: number[][], vertices: VertexBaseData[]) => {

  const nodes = adjacentMatrix.map((_, i) => {
    const { id, value} = vertices[i];
    return ({
    id,
    name: value,
    index: i,
    x: (i % 3) * (GRAPH_CIRCLE_RADIUS * 3) + GRAPH_CIRCLE_RADIUS + 5,
    y: Math.floor(i / 3) * (GRAPH_CIRCLE_RADIUS * 3) + GRAPH_CIRCLE_RADIUS + 5,
  })});


  const links = getLinks(adjacentMatrix, vertices);

  return { nodes, links };
};