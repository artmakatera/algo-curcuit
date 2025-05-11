import { CornerRightUp } from "lucide-react";
import { GraphEditorProps } from "../../types";
import { AdjacencyMatrixTableLinkCell } from "./adjacency-matrix-table-link-cell";
import { AdjacencyTableTitleCell } from "../adjacency-table-title-cell";
import { getVertexName } from "../../hooks/use-adjacency-list";
import { AddRow } from "../add-row";

export const AdjacencyMatrixTable = ({
  adjacencyMatrix,
  onAdd,
  disableAdd,
  onToggle,
  onRemove,
  vertices = [],
}: GraphEditorProps) => {
  return (
    <div className="  sm:mx-auto pl-2 ">
      <table className="w-full border-collapse border bg-white dark:bg-slate-800 shadow-2xl">
        <thead>
          <tr>
            <AdjacencyTableTitleCell cellValue={<CornerRightUp />} />
            {adjacencyMatrix?.[0]?.map((_, index) => (
              <AdjacencyTableTitleCell
                key={index}
                cellValue={getVertexName(vertices, index)}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {adjacencyMatrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* Row Header */}

              <AdjacencyTableTitleCell
                cellValue={getVertexName(vertices, rowIndex)}
                onRemove={(e) => {
                  e.stopPropagation();
                  onRemove && onRemove(rowIndex);
                }}
              />

              {/* Data Cells */}
              {row.map((cell, cellIndex) => {
                const isDisabled = cellIndex === rowIndex;
                return (
                  <AdjacencyMatrixTableLinkCell
                    key={cellIndex}
                    rowIndex={rowIndex}
                    cellIndex={cellIndex}
                    cellValue={cell}
                    disabled={isDisabled}
                    onClick={onToggle}
                  />
                );
              })}
            </tr>
          ))}
          <AddRow onAdd={onAdd} disabled={disableAdd} length={vertices.length} />
        </tbody>
      </table>
    </div>
  );
};
