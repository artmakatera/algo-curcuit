import { AdjacencyMatrix, VertexBaseData } from "@/shared/types/data-structures";
import { GRAPH_CIRCLE_RADIUS, GraphNode } from "../d3-elements";
import { hasGraphEdge } from "@/features/visual-graph-editor";
import { LinkData } from "../d3-elements/graph-link";
import clsx from "clsx";

/**
 * Options for node visualization states
 */
interface GraphVisualizationOptions {
  /** Index of the node currently highlighted (e.g., being processed) */
  highlightedNodeIndex?: number | null;
  /** Index of the source node that connects to the highlighted node */
  sourceHighlightedNodeIndex?: number | null;
  /** Indices of nodes in "awaiting" state (e.g., in queue to be processed) */
  awaitingNodeIndices?: number[];
  /** Indices of nodes that are part of the result (e.g., part of the path found) */
  resultNodeIndices?: number[];
  hasArrows?: boolean; // Whether to show arrows on links
}

/**
 * Internal flags for link visualization
 */
interface LinkVisualizationContext {
  highlightedNodeIndex?: number | null;
  sourceHighlightedNodeIndex?: number | null;
  awaitingNodesSet: Set<number>;
  resultNodesSet: Set<number>;
  hasArrows?: boolean; // Whether to show arrows on links

}

/**
 * Complete graph data structure for visualization
 */
interface GraphVisualizationData {
  nodes: GraphNode[];
  links: LinkData[];
}

/**
 * Calculate coordinates for a node based on its index
 * This creates a grid layout for the nodes
 */
function calculateNodeCoordinates(index: number): { x: number, y: number } {
  const spacing = GRAPH_CIRCLE_RADIUS * 3;
  const nodesPerRow = 3; // Number of nodes per row in the grid
  const padding = 5;

  return {
    x: (index % nodesPerRow) * spacing + GRAPH_CIRCLE_RADIUS + padding,
    y: Math.floor(index / nodesPerRow) * spacing + GRAPH_CIRCLE_RADIUS + padding
  };
}

/**
 * Generate link data from adjacency matrix and vertices
 */
function generateGraphLinks(
  adjacencyMatrix: AdjacencyMatrix,
  vertices: VertexBaseData[],
  visualizationContext: LinkVisualizationContext
): LinkData[] {
  const {
    highlightedNodeIndex,
    sourceHighlightedNodeIndex,
    awaitingNodesSet,
    resultNodesSet,
    hasArrows = true
  } = visualizationContext;

  const linksMap = new Map<string, LinkData>();

  // Iterate through the adjacency matrix to find edges
  for (let sourceIndex = 0; sourceIndex < adjacencyMatrix.length; sourceIndex++) {
    for (let targetIndex = 0; targetIndex < adjacencyMatrix[sourceIndex].length; targetIndex++) {
      // Check if there's an edge between these vertices
      if (hasGraphEdge(adjacencyMatrix[sourceIndex][targetIndex])) {
        const sourceId = vertices[sourceIndex].id;
        const targetId = vertices[targetIndex].id;
        if (sourceId === targetId) continue; // Skip self-loops

        const existedLinkId = createLinkId(targetId, sourceId);
        if (linksMap.has(existedLinkId)) {
          const existingLink = linksMap.get(existedLinkId)!;
          existingLink.startArrow = hasArrows;
          continue;
        }

        // Determine link visualization states
        const isHighlighted =
          highlightedNodeIndex === targetIndex && sourceHighlightedNodeIndex === sourceIndex;
        const isAwaiting =
          awaitingNodesSet.has(targetIndex) && resultNodesSet.has(sourceIndex);
        const isResult =
          resultNodesSet.has(targetIndex) && resultNodesSet.has(sourceIndex);
        const linkId = createLinkId(sourceId, targetId);
        linksMap.set(linkId, {
          source: sourceId,
          target: targetId,
          id: linkId,
          endArrow: hasArrows,
          startArrow: false,
          isHighlighted,
          isAwaiting,
          isResult,
        });
      }
    }
  }

  return Array.from(linksMap.values());
}

/**
 * Generate node data from vertices
 */
function generateGraphNodes(
  vertices: VertexBaseData[],
  adjacencyMatrix: AdjacencyMatrix,
  visualizationContext: {
    highlightedNodeIndex?: number | null;
    sourceHighlightedNodeIndex?: number | null;
    awaitingNodesSet: Set<number>;
    resultNodesSet: Set<number>;
  }
): GraphNode[] {
  const {
    highlightedNodeIndex,
    sourceHighlightedNodeIndex,
    awaitingNodesSet,
    resultNodesSet
  } = visualizationContext;

  return adjacencyMatrix.map((nodeLinks, index) => {
    const { id, value } = vertices[index];
    const { x, y } = calculateNodeCoordinates(index);

    // Determine node visualization states
    const isHighlighted =
      highlightedNodeIndex === index || sourceHighlightedNodeIndex === index;
    const isAwaiting = awaitingNodesSet.has(index);
    const isResult = resultNodesSet.has(index);

    return {
      id,
      name: value,
      index,
      x,
      y,
      isHighlighted,
      isAwaiting,
      isResult,
      isLooped: nodeLinks[index] === 1, // Self-loop check,
      loopCheck: sourceHighlightedNodeIndex === index && highlightedNodeIndex === index,
      loopResult: (isResult && sourceHighlightedNodeIndex !== index) || (sourceHighlightedNodeIndex === index && (highlightedNodeIndex ?? -1) > index),
    };
  });
}

/**
 * Transform adjacency matrix and vertices into graph visualization data
 * 
 * @param adjacencyMatrix - Matrix representing connections between vertices
 * @param vertices - Array of vertex data objects
 * @param options - Options for visualization states
 * @returns Graph data for visualization
 */
export function transformAdjacencyMatrixToGraph(
  adjacencyMatrix: AdjacencyMatrix,
  vertices: VertexBaseData[],
  options: GraphVisualizationOptions = {}
): GraphVisualizationData {
  const {
    highlightedNodeIndex: highlightedNode = null,
    sourceHighlightedNodeIndex: sourceHighlightedNode = null,
    awaitingNodeIndices: awaitingNodes = [],
    resultNodeIndices: resultNodes = [],
  hasArrows = true

  } = options;

  // Create sets for efficient lookups
  const awaitingNodesSet = new Set<number>(awaitingNodes);
  const resultNodesSet = new Set<number>(resultNodes);

  const visualizationContext = {
    highlightedNodeIndex: highlightedNode,
    sourceHighlightedNodeIndex: sourceHighlightedNode,
    awaitingNodesSet,
    resultNodesSet,
    hasArrows
  };

  // Generate nodes and links
  const nodes = generateGraphNodes(vertices, adjacencyMatrix, visualizationContext);
  const links = generateGraphLinks(adjacencyMatrix, vertices, visualizationContext);

  return { nodes, links };
}


function createLinkId(source: number, target: number): string {
  return `${source}-${target}`;
}
