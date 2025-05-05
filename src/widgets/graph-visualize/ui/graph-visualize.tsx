"use client";

import { VisualGraph } from "@/features/visual-graph";

import { AdjacencyMatrixTable } from "@/features/visual-graph-editor/ui/adjacency-matrix-table/adjacency-table";
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
    verticesNames,
    addVertex,
    toggleEdge,
    removeVertex,
    disableAdd,
  } = useAdjacencyMatrix(matrix);

  return (
    <div className="flex flex-col px-4 sm:px-24 py-10">
      <VisualGraph adjacencyMatrix={adjacencyMatrix} verticesNames={verticesNames} />
      <AdjacencyMatrixTable
        adjacencyMatrix={adjacencyMatrix}
        disableAdd={disableAdd}
        onToggle={toggleEdge}
        onAdd={addVertex}
        verticesNames={verticesNames}
      />
    </div>
  );
};
