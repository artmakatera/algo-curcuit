import { AdjacencyMatrix, VertexBaseData } from "@/shared/types/data-structures";
import { cn } from "@/shared/lib/utils"; // Assuming you have a utility for class names
import { Button } from "@/components/ui/button";
import { Plus, Delete, Trash } from "lucide-react";
import {
  AddGraphVertex,
  RemoveGraphVertex,
  UpdateGraphEdge,
} from "../../types";

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
    <div className=" w-fit mx-auto relative pr-10 pb-10">
      <table className="border-collapse border border-slate-400 bg-white dark:bg-slate-800 shadow-2xl">
        <caption className="mb-2 text-lg font-semibold text-slate-800 dark:text-slate-200 caption-top">
          Adjacency Matrix
        </caption>
        <thead>
          <tr>
            <th className="border border-slate-300 bg-muted  p-2 text-center font-semibold text-slate-700 dark:text-slate-200 w-10">
              {/* Empty top-left corner or label */}
              {/* Row/Col */}
            </th>
            {adjacencyMatrix[0].map((_, index) => (
              <th
                key={index}
                className="border border-slate-300 bg-muted p-2 text-center font-semibold w-10 text-slate-700 dark:text-slate-200"
              >
                {vertices[index].value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {adjacencyMatrix.map((row, rowIndex) => (
            <tr key={vertices[rowIndex].value}>
              {/* Row Header */}
              <td className="relative border border-slate-300 bg-muted p-2 text-center font-semibold text-slate-700 dark:text-slate-200 w-10">
                {vertices[rowIndex].value}
                <Button
                  variant="destructive"
                  size={"icon"}
                  className="absolute top-1 right-full mr-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onRemove) {
                      onRemove(rowIndex);
                    }
                  }}
                >
                  <Trash />
                </Button>
              </td>
              {/* Data Cells */}
              {row.map((cell, cellIndex, cellArr) => {
                const isDisabled = cellIndex === rowIndex; // Disable diagonal cells

                return (
                  <td
                    tabIndex={0}
                    key={cellIndex}
                    onClick={() => {
                      if (onToggle && !isDisabled) {
                        onToggle(rowIndex, cellIndex);
                      }
                    }}
                    className={cn(
                      "relative",
                      "border border-slate-300 p-2 text-center w-10",
                      "cursor-pointer",
                      cell === 1
                        ? "bg-blue-100 dark:bg-blue-600/60 hover:bg-blue-200 dark:hover:bg-blue-700"
                        : "bg-background hover:bg-gray-100 dark:hover:bg-gray-700",
                      isDisabled &&
                        " bg-background/30 hover:bg-background/30 dark:hover:bg-gray-800/30 text-gray-400 dark:text-gray-600 "
                    )}
                  >
                    {cell}
                  </td>
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
  );
};
