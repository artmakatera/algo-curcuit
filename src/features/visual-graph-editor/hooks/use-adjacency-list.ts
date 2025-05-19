import { useCallback, useState, useRef } from "react";

import type { AdjacencyMatrix, VertexBaseData } from "@/shared/types/data-structures"
import { AddGraphVertex, RemoveGraphVertex, UpdateGraphEdge } from "../types";

// Define the structure for a vertex

export const MAX_VERTICES = 7; // A-Z



export const addVertexName = (index: number) => {
  if (index < 0 || index >= MAX_VERTICES) {
    throw new Error("Index out of bounds");
  }
  return String.fromCharCode(index + 65); // Convert index to letter (A, B, C, ...)
}

export const useAdjacencyMatrix = (initialValue: AdjacencyMatrix) => {
  // Use ref for tracking next available ID - doesn't need to trigger re-renders
  const nextIdRef = useRef(initialValue.length);

  // Store vertices as objects with ID and value
  const [vertices, setVertices] = useState<VertexBaseData[]>(() =>
    initialValue.map((_, index) => ({
      id: index,
      value: addVertexName(index)
    }))
  );

  const [adjacencyMatrix, setAdjacencyMatrix] = useState<AdjacencyMatrix>(initialValue);



  const addVertex: AddGraphVertex = useCallback((name) => {
    if (vertices.length >= MAX_VERTICES) {
      console.error("Maximum number of vertices reached");
      return;
    }

    const newName = name || generateNextName(vertices);

    // Create new vertex with unique ID
    const newVertex: VertexBaseData = {
      id: nextIdRef.current,
      value: newName
    };
    nextIdRef.current++; // Increment the ID counter

    setVertices(prev => [...prev, newVertex]);

    setAdjacencyMatrix((prev) => {
      const newAdjacencyMatrix = prev.map((row) => [...row, 0]);
      newAdjacencyMatrix.push(new Array(newAdjacencyMatrix.length + 1).fill(0)); // Add a new row
      return newAdjacencyMatrix;
    });
  }, [vertices]);

  const toggleEdge: UpdateGraphEdge = useCallback((from: number, to: number) => {
    setAdjacencyMatrix((prev) => {
      const newAdjacencyMatrix = prev.map((row) => [...row]); // Create a copy of the adjacency list
      newAdjacencyMatrix[from][to] = newAdjacencyMatrix[from][to] === 1 ? 0 : 1; // Toggle the edge
      return newAdjacencyMatrix;
    });
  }, []);

  const removeVertex: RemoveGraphVertex = useCallback((index: number) => {
    setAdjacencyMatrix((prev) => {
      return prev.reduce<AdjacencyMatrix>((acc, row, i) => {
        if (i === index) return acc; // Skip the row to be removed
        const newRow = row.filter((_, colIndex) => colIndex !== index); // Remove the column
        acc.push(newRow);
        return acc;
      }, []);
    });
    setVertices((prev) => prev.filter((_, i) => i !== index)); // Remove the vertex from the list
  }, []);


  return {
    adjacencyMatrix,
    vertices, // Additionally expose the vertices with IDs if needed
    addVertex,
    toggleEdge,
    removeVertex,
    disableAdd: vertices.length >= MAX_VERTICES,
  };
}


export function generateNextName(vertices: VertexBaseData[]) {
  let newName = '';
  for (let i = 0; i < MAX_VERTICES; i++) {
    const usedNames = new Set(vertices.map(v => v.value));

    const candidateName = addVertexName(i);
    if (!usedNames.has(candidateName)) {
      newName = candidateName;
      break;
    }
  }

  return newName;
}
