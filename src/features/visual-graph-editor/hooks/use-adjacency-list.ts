import { useCallback, useState } from "react";

import type { AdjacencyMatrix } from "@/shared/types/data-structures"
import { AddGraphVertex, RemoveGraphVertex, UpdateGraphEdge } from "../types";

export const MAX_VERTICES = 8; // A-Z

const addVertexName = (index: number) => {
  if (index < 0 || index >= MAX_VERTICES) {
    throw new Error("Index out of bounds");
  }
  return String.fromCharCode(index + 65); // Convert index to letter (A, B, C, ...)
}

export const useAdjacencyMatrix = (initialValue: AdjacencyMatrix) => {
  const [adjacencyMatrix, setAdjacencyMatrix] = useState<AdjacencyMatrix>(initialValue);
  const [verticesNames, setVerticesNames] = useState<(string)[]>(() => initialValue.map((_, index) => addVertexName(index))); // Convert index to letter (A, B, C, ...)

  const addVertex: AddGraphVertex = useCallback(() => {
    if (verticesNames.length >= MAX_VERTICES) {
      console.error("Maximum number of vertices reached");
      return;
    }
    const newVertex = addVertexName(verticesNames.length); 
    setVerticesNames((prev) => [...prev, newVertex]);
    setAdjacencyMatrix((prev) => {
      const newAdjacencyMatrix = prev.map((row) => [...row, 0]);
      newAdjacencyMatrix.push(new Array(newAdjacencyMatrix.length + 1).fill(0)); // Add a new row
      return newAdjacencyMatrix;
    })
  }, [verticesNames]);


  const toggleEdge: UpdateGraphEdge = useCallback((from: number, to: number) => {
    setAdjacencyMatrix((prev) => {
      const newAdjacencyMatrix = prev.map((row) => [...row]); // Create a copy of the adjacency list
      newAdjacencyMatrix[from][to] = newAdjacencyMatrix[from][to] === 1 ? 0 : 1; // Toggle the edge
      return newAdjacencyMatrix;
    }
    );
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
    setVerticesNames((prev) => prev.filter((_, i) => i !== index)); // Remove the vertex from the list
  }, []);

  return {
    adjacencyMatrix,
    verticesNames,
    addVertex,
    toggleEdge,
    removeVertex,
    disableAdd: verticesNames.length >= MAX_VERTICES,
  };
}