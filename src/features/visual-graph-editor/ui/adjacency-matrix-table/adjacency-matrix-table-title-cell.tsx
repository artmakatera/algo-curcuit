import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

import React from "react";
type  AdjacencyMatrixTableTitleCellProps = React.HTMLProps<HTMLTableCellElement> & {
  cellValue: React.ReactNode;
  onRemove?: () => void;
}

export const AdjacencyMatrixTableTitleCell = ({
  cellValue,
  onRemove,
  ...props
}: AdjacencyMatrixTableTitleCellProps) => {
  return (
    <td
      className="relative border border-slate-300 bg-muted p-2 text-center font-semibold text-slate-700 dark:text-slate-200 w-10"
      {...props}
    >
      {cellValue}
      {onRemove && (
        <Button
          variant="destructive"
          size={"icon"}
          className="absolute top-1 right-full mr-2"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <Trash />
        </Button>
      )}
    </td>
  );
};
