import {
  AdjacencyMatrix,
  VertexBaseData,
} from "@/shared/types/data-structures";

import {
  AddGraphVertex,
  RemoveGraphVertex,
  UpdateGraphEdge,
} from "../../types";

import { getVertexName } from "../../hooks/use-adjacency-list";
import { AdjacencyTableTitleCell } from "../adjacency-table-title-cell";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { AdjacencyListLinksCell } from "./adjacency-list-links-cell";

interface AdjacencyListProps {
  adjacencyMatrix: AdjacencyMatrix;
  onAdd: AddGraphVertex;
  onToggle?: UpdateGraphEdge;
  onRemove?: RemoveGraphVertex;
  disableAdd?: boolean;
  vertices?: VertexBaseData[];
}

export const AdjacencyList = ({
  adjacencyMatrix,
  onAdd,
  disableAdd,
  onToggle,
  onRemove,
  vertices = [],
}: AdjacencyListProps) => {
  return (
    <div className=" max-w-sm w-full relative sm:mx-auto">
        <table className="w-full border-collapse border border-slate-400 bg-white dark:bg-slate-800 shadow-2xl">
          <caption className="mb-2 text-lg font-semibold text-slate-800 dark:text-slate-200 caption-top">
            Adjacency List
          </caption>
          <thead>
            <tr>
              <AdjacencyTableTitleCell cellValue={" "} />
              <AdjacencyTableTitleCell cellValue="Vertex" />
              <AdjacencyTableTitleCell cellValue="Edges" />
            </tr>
          </thead>
          <tbody>
            {adjacencyMatrix.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <AdjacencyTableTitleCell
                  className="p-0 w-10"
                  cellValue={
                    <Button
                      variant="destructive"
                      size={"icon"}
                      className="w-10 h-10 rounded-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove && onRemove(rowIndex);
                      }}
                    >
                      <Trash size={12} />
                    </Button>
                  }
                />
                <AdjacencyTableTitleCell
                className="p-0 w-10"
                  cellValue={getVertexName(vertices, rowIndex)}
                />
                <AdjacencyListLinksCell links={row} rowIndex={rowIndex} vertices={vertices} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};
