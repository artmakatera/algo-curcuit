import { describe, it, expect } from "vitest";
import { transformAdjacencyMatrixToGraph } from "@/features/visual-graph/model/transform-data";
import { VertexBaseData } from "@/shared/types/data-structures";
import { GRAPH_CIRCLE_RADIUS } from "@/features/visual-graph/d3-elements";

describe("transformAdjacencyMatrixToGraph", () => {
  // Test for basic functionality
  it("should transform adjacency matrix to graph data structure", () => {
    // Test data
    const adjacencyMatrix = [
      [0, 1, 0],
      [1, 0, 1],
      [0, 1, 0]
    ];
    
    const vertices: VertexBaseData[] = [
      { id: 100, value: "A" },
      { id: 200, value: "B" },
      { id: 300, value: "C" }
    ];
    
    // Execute transformation
    const result = transformAdjacencyMatrixToGraph(adjacencyMatrix, vertices);
    
    // Verify nodes
    expect(result.nodes.length).toBe(3);
    expect(result.nodes[0].id).toBe(100);
    expect(result.nodes[0].name).toBe("A");
    expect(result.nodes[1].id).toBe(200);
    expect(result.nodes[1].name).toBe("B");
    
    // Verify links
    expect(result.links.length).toBe(4); // There should be 4 links in the example matrix
    
    // Check for links between A and B (both directions)
    const linkAB = result.links.find(l => l.id === "100-200");
    const linkBA = result.links.find(l => l.id === "200-100");
    expect(linkAB).toBeDefined();
    expect(linkBA).toBeDefined();
    
    // Check for links between B and C (both directions)
    const linkBC = result.links.find(l => l.id === "200-300");
    const linkCB = result.links.find(l => l.id === "300-200");
    expect(linkBC).toBeDefined();
    expect(linkCB).toBeDefined();
  });
  
  // Test for node positioning
  it("should calculate node positions correctly", () => {
    const adjacencyMatrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    
    const vertices: VertexBaseData[] = [
      { id: 1, value: "A" },
      { id: 2, value: "B" },
      { id: 3, value: "C" }
    ];
    
    const result = transformAdjacencyMatrixToGraph(adjacencyMatrix, vertices);
    
    // Verify node positions based on index
    expect(result.nodes[0].x).toBe(GRAPH_CIRCLE_RADIUS + 5); // First node in first column
    expect(result.nodes[0].y).toBe(GRAPH_CIRCLE_RADIUS + 5); // First node in first row
    
    expect(result.nodes[1].x).toBe((GRAPH_CIRCLE_RADIUS * 3) + GRAPH_CIRCLE_RADIUS + 5); // Second node in first row
    expect(result.nodes[1].y).toBe(GRAPH_CIRCLE_RADIUS + 5);
    
    expect(result.nodes[2].x).toBe((2 * GRAPH_CIRCLE_RADIUS * 3) + GRAPH_CIRCLE_RADIUS + 5); // Third node in first row
    expect(result.nodes[2].y).toBe(GRAPH_CIRCLE_RADIUS + 5);
  });
  
  // Test for highlight, awaiting and result flags
  it("should correctly set visual state flags for nodes and links", () => {
    const adjacencyMatrix = [
      [0, 1, 0],
      [1, 0, 1],
      [0, 1, 0]
    ];
    
    const vertices: VertexBaseData[] = [
      { id: 1, value: "A" },
      { id: 2, value: "B" },
      { id: 3, value: "C" }
    ];
    
    // Node 0 is highlighted, node 1 is awaiting, node 2 is result
    const result = transformAdjacencyMatrixToGraph(adjacencyMatrix, vertices, {
      highlightedNodeIndex: 0,
      sourceHighlightedNodeIndex: 1,
      awaitingNodeIndices: [1],
      resultNodeIndices: [2]
    });
    
    // Check node states
    expect(result.nodes[0].isHighlighted).toBe(true);
    expect(result.nodes[0].isAwaiting).toBe(false);
    expect(result.nodes[0].isResult).toBe(false);
    
    expect(result.nodes[1].isHighlighted).toBe(true);  // Source highlighted
    expect(result.nodes[1].isAwaiting).toBe(true);
    expect(result.nodes[1].isResult).toBe(false);
    
    expect(result.nodes[2].isHighlighted).toBe(false);
    expect(result.nodes[2].isAwaiting).toBe(false);
    expect(result.nodes[2].isResult).toBe(true);
    
    // Check that B-C link exists with result node C
    const link = result.links.find(l => l.source === 2 && l.target === 3);
    expect(link).toBeDefined();
    
    // Check for highlighted link between source and highlighted node
    const highlightedLink = result.links.find(l => l.source === 2 && l.target === 1);
    expect(highlightedLink?.isHighlighted).toBe(true);
  });
  
});
