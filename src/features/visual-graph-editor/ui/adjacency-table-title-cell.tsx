import { cn } from "@/shared/lib/utils";
import { RemoveIconButton } from "./remove-icon-button";
type AdjacencyTableTitleCellProps = React.HTMLProps<HTMLTableCellElement> & {
  cellValue: React.ReactNode;
  onRemove?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const AdjacencyTableTitleCell = ({
  className,
  cellValue,
  onRemove,
  ...props
}: AdjacencyTableTitleCellProps) => {
  return (
    <td
      className={cn(
        " border border-slate-300 bg-muted p-2 text-center align-middle font-bold min-w-10",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center gap-1">
      <span>{cellValue}</span>
      {onRemove && (
         <RemoveIconButton onClick={onRemove} variant="destructive" />
      )}
      </div>
    </td>
  );
};
