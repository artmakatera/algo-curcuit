
import { VertexBaseData } from "@/shared/types/data-structures";
import {
  GRAPH_CIRCLE_RADIUS,
} from "../d3-elements";
import { hasGraphEdge } from "@/features/visual-graph-editor";



type FlagsOptions = {
  highlightedNode?: number | null;
  awaitingNodes?: number[];
  resultNodes?: number[];
};

const getLinks = (adjacentMatrix: number[][], vertices: VertexBaseData[], { highlightedNode, awaitingNodes, resultNodes }: FlagsOptions) => {
  const links = [];
  for (let i = 0; i < adjacentMatrix.length; i++) {
    for (let j = 0; j < adjacentMatrix[i].length; j++) {
      if (hasGraphEdge(adjacentMatrix[i][j])) {
        const source = vertices[i].id;
        const target = vertices[j].id;

        links.push({
          source, target, id: `${source}-${target}`,
          isHighlighted: highlightedNode === j,
          isAwaiting: awaitingNodes?.includes(j) || false,
          isResult: resultNodes?.includes(j) || false,
        });
      }
    }
  }
  return links;
};

export const getGraphFromAdjacencyMatrix = (adjacentMatrix: number[][], vertices: VertexBaseData[], { highlightedNode, awaitingNodes, resultNodes }: FlagsOptions) => {

  const nodes = adjacentMatrix.map((_, i) => {
    const { id, value } = vertices[i];
    return ({
      id,
      name: value,
      index: i,
      x: (i % 3) * (GRAPH_CIRCLE_RADIUS * 3) + GRAPH_CIRCLE_RADIUS + 5,
      y: Math.floor(i / 3) * (GRAPH_CIRCLE_RADIUS * 3) + GRAPH_CIRCLE_RADIUS + 5,
      isHighlighted: highlightedNode === i,
      isAwaiting: awaitingNodes?.includes(i) || false,
      isResult: resultNodes?.includes(i) || false,
    })
  });

  const links = getLinks(adjacentMatrix, vertices, { highlightedNode, awaitingNodes, resultNodes });

  return {
    nodes, links
  };
};