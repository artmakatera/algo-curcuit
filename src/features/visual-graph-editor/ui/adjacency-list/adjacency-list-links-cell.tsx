import { Badge } from "@/components/ui/badge";
import { VertexBaseData } from "@/shared/types/data-structures";
import { get } from "http";
import { getVertexName } from "../../hooks/use-adjacency-list";

interface AdjacencyListLinksCellProps {
  rowIndex: number;
  links: number[];
  vertices: VertexBaseData[];
  onAdd?: (rowIndex: number, cellIndex: number) => void;
  onRemove?: (rowIndex: number, cellIndex: number) => void;
}

export const AdjacencyListLinksCell = ({
  rowIndex,
  vertices,
  links,
}: AdjacencyListLinksCellProps) => {
  return (
    <td className=" hover:bg-gray-100 dark:hover:bg-gray-700 border border-slate-300 text-left ">
      <div>
        {links.map((col, index) => {
          if (col < 1) return null;

          return (
            <Badge
              key={index}
              className="m-1 min-w-12 text-md bg-muted"
              variant="outline"
            >
              {getVertexName(vertices, index)}
            </Badge>
          );
        })}
      </div>
    </td>
  );
};
