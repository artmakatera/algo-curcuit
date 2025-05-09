import {
  AdjacencyMatrix,
  VertexBaseData,
} from "@/shared/types/data-structures";
import { cn } from "@/shared/lib/utils"; // Assuming you have a utility for class names
import { Button } from "@/components/ui/button";
import { Plus, Trash, CornerRightUp } from "lucide-react";
import {
  AddGraphVertex,
  RemoveGraphVertex,
  UpdateGraphEdge,
} from "../../types";
import { AdjacencyMatrixTableLinkCell } from "./adjacency-matrix-table-link-cell";
import { AdjacencyMatrixTableTitleCell } from "./adjacency-matrix-table-title-cell";
import { getVertexName } from "../../hooks/use-adjacency-list";

interface AdjacencyMatrixTableProps {
  adjacencyMatrix: AdjacencyMatrix;
  onAdd: AddGraphVertex;
  onToggle?: UpdateGraphEdge;
  onRemove?: RemoveGraphVertex;
  disableAdd?: boolean;
  vertices?: VertexBaseData[];
}

export const AdjacencyMatrixTable = ({
  adjacencyMatrix,
  onAdd,
  disableAdd,
  onToggle,
  onRemove,
  vertices = [],
}: AdjacencyMatrixTableProps) => {
  return (
    <div className=" w-[305px] mx-auto relative pl-8">
      <div className="w-fit">
        <table className="border-collapse border border-slate-400 bg-white dark:bg-slate-800 shadow-2xl">
          <caption className="mb-2 text-lg font-semibold text-slate-800 dark:text-slate-200 caption-top">
            Adjacency Matrix
          </caption>
          <thead>
            <tr>
              <AdjacencyMatrixTableTitleCell cellValue={<CornerRightUp />} />
              {adjacencyMatrix?.[0]?.map((_, index) => (
                <AdjacencyMatrixTableTitleCell
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
                <AdjacencyMatrixTableTitleCell
                  cellValue={getVertexName(vertices, rowIndex)}
                  onRemove={() => {
                    if (onRemove) {
                      onRemove(rowIndex);
                    }
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
          </tbody>
        </table>
        {!disableAdd && (
          <div className="w-full p-2 bg-muted">
            <Button
              variant="destructive"
              className="w-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
              onClick={onAdd}
            >
              Add <Plus />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
