import { AdjacencyMatrix } from "@/shared/types/data-structures";
import { cn } from "@/shared/lib/utils"; // Assuming you have a utility for class names
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
  verticesNames?: string[];
}

export const AdjacencyMatrixTable = ({
  adjacencyMatrix,
  onAdd,
  disableAdd,
  onToggle,
  verticesNames = [],
}: AdjacencyMatrixTableProps) => {
  return (
    <div className=" w-fit mx-auto relative pr-10 pb-10">
      <table className="border-collapse border border-slate-400 bg-white dark:bg-slate-800">
        <caption className="mb-2 text-lg font-semibold text-slate-800 dark:text-slate-200 caption-top">
          Adjacency Matrix
        </caption>
        <thead>
          <tr>
            <th className="border border-slate-300 bg-slate-200 dark:bg-slate-700  p-2 text-center font-semibold text-slate-700 dark:text-slate-200 w-10">
              {/* Empty top-left corner or label */}
              {/* Row/Col */}
            </th>
            {adjacencyMatrix[0].map((_, index) => (
              <th
                key={index}
                className="border border-slate-300 bg-slate-200 dark:bg-slate-700 p-2 text-center font-semibold w-10 text-slate-700 dark:text-slate-200"
              >
                {verticesNames[index]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {adjacencyMatrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* Row Header */}
              <td className=" border border-slate-300 bg-slate-200 dark:bg-slate-700 p-2 text-center font-semibold text-slate-700 dark:text-slate-200 w-10">
                {verticesNames[rowIndex]}
              </td>
              {/* Data Cells */}
              {row.map((cell, cellIndex) => {
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
                      "border border-slate-300 p-2 text-center w-10",
                      "cursor-pointer",
                      cell === 1
                        ? "bg-blue-100 dark:bg-blue-600/60 hover:bg-blue-200 dark:hover:bg-blue-700"
                        : "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700",
                      isDisabled &&
                        " cursor-not-allowed bg-gray-50/30 hover:bg-gray-50/30 dark:bg-gray-800/30 dark:hover:bg-gray-800/30 text-gray-400 dark:text-gray-600 "
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
        <div className="w-full p-2 bg-slate-200 dark:bg-slate-700">
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
