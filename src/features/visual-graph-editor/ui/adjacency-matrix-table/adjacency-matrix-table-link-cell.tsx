import { cn } from "@/shared/lib/utils";
import { UpdateGraphEdge } from "../../types";

interface AdjacencyMatrixTableLinkCellProps extends Omit<React.HTMLProps<HTMLTableCellElement>, "onClick"> {
  rowIndex: number;
  cellIndex: number;
  cellValue: number;
  disabled: boolean;
  onClick?: UpdateGraphEdge;
}

export const AdjacencyMatrixTableLinkCell = ({
  onClick,
  disabled,
  rowIndex,
  cellIndex,
  cellValue,
}: AdjacencyMatrixTableLinkCellProps) => {
  return (
    <td
      tabIndex={0}
      onClick={() => {
        if (onClick && !disabled) {
          onClick(rowIndex, cellIndex);
        }
      }}
      className={cn(
        "relative",
        "border p-2 text-center w-10",
        "cursor-pointer",
        cellValue > 0
          ? "bg-blue-100 dark:bg-blue-100/60 hover:bg-blue-100 dark:hover:bg-blue-200"
          : "bg-background hover:bg-gray-100 dark:hover:bg-gray-700",
        disabled &&
          " bg-background/50 hover:bg-background/50 dark:hover:bg-gray-800/30 text-gray-400 dark:text-gray-600 "
      )}
    >
      {cellValue}
    </td>
  );
};
