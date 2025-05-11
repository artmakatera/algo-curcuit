import { GraphEditorProps } from "../../types";

import { getVertexName } from "../../hooks/use-adjacency-list";
import { AdjacencyTableTitleCell } from "../adjacency-table-title-cell";
import { AdjacencyListLinksCell } from "./adjacency-list-links-cell";
import { AddRow } from "../add-row";

export const AdjacencyList = ({
  adjacencyMatrix,
  onAdd,
  disableAdd,
  onToggle,
  onRemove,
  vertices = [],
}: GraphEditorProps) => {
  return (
    <div className="w-[305px] relative sm:mx-auto">
      <table className="w-full  bg-white dark:bg-slate-800 shadow-2xl">
        <thead>
          <tr>
            <AdjacencyTableTitleCell cellValue="Vertex" />
            <AdjacencyTableTitleCell cellValue="Edges" />
          </tr>
        </thead>
        <tbody>
          {adjacencyMatrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <AdjacencyTableTitleCell
                className="p-0 w-10 h-10"
                cellValue={getVertexName(vertices, rowIndex)}
                onRemove={(e) => {
                  e.stopPropagation();
                  onRemove && onRemove(rowIndex);
                }}
              />
              <AdjacencyListLinksCell
                links={row}
                rowIndex={rowIndex}
                vertices={vertices}
                onToggle={onToggle}
              />
            </tr>
          ))}
          <AddRow onClick={onAdd} disabled={disableAdd} />
        </tbody>
      </table>
    </div>
  );
};
