import { Badge } from "@/components/ui/badge";
import { VertexBaseData } from "@/shared/types/data-structures";
import { Plus, X } from "lucide-react";
import { RemoveIconButton } from "../remove-icon-button";
import { UpdateGraphEdge } from "../../types";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getVertexName, hasGraphEdge } from "../../model/helpers";


interface AdjacencyListLinksCellProps {
  rowIndex: number;
  links: number[];
  vertices: VertexBaseData[];
  onToggle?: UpdateGraphEdge;
  disableLoop?: boolean;
}

const getConnectedAndNotIndexes = (links: number[], rowIndex: number, disableLoop?: boolean) => links.reduce<Record<string, number[]>>((acc, value, index) => {
  if (hasGraphEdge(value)) {
    acc.connected.push(index);
  } else if (rowIndex !== index || !disableLoop) {
    acc.toConnect.push(index);
  }

  return acc;
}, {
  connected: [],
  toConnect:[]
})

export const AdjacencyListLinksCell = ({
  rowIndex,
  vertices,
  links,
  onToggle,
  disableLoop,
}: AdjacencyListLinksCellProps) => {
  
  const { connected, toConnect } = getConnectedAndNotIndexes(links, rowIndex, disableLoop)
  return (
    <td className="border text-left bg-background">
      <div className="m-1 flex items-center justify-start flex-wrap gap-2">
        {connected.map(( index) => {

          return (
            <Badge
              key={index}
              className="text-md bg-gray-100 dark:bg-gray-800"
              variant="outline"
            >
              {getVertexName(vertices, index)}
              <RemoveIconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle && onToggle(rowIndex, index);
                }}
              />
            </Badge>
          );
        })}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" className="size-7" >
              <Plus />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {toConnect
            .map((index) => {
              return (
                <DropdownMenuItem
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle && onToggle(rowIndex, index);
                  }}
                >
                  Connect to {getVertexName(vertices, index)} 
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </td>
  );
};
