"use client";

import { VisualGraph } from "@/features/visual-graph";

import { AdjacencyMatrixTable } from "@/features/visual-graph-editor/";
import { useAdjacencyMatrix } from "@/features/visual-graph-editor/hooks/use-adjacency-list";

const matrix = [
  [0, 1, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 1, 0, 0],
];

export const GraphVisualize = () => {
  const {
    adjacencyMatrix,
    vertices,
    addVertex,
    toggleEdge,
    removeVertex,
    disableAdd,
  } = useAdjacencyMatrix(matrix);

  return (
    <div className="flex flex-col sm:px-24 py-10">
      <VisualGraph adjacencyMatrix={adjacencyMatrix} vertices={vertices} />
      <AdjacencyMatrixTable
        adjacencyMatrix={adjacencyMatrix}
        disableAdd={disableAdd}
        onToggle={toggleEdge}
        onAdd={addVertex}
        vertices={vertices}
        onRemove={removeVertex}
      />
    </div>
  );
};
