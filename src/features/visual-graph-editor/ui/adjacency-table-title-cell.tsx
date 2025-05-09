import { cn } from "@/shared/lib/utils";
type AdjacencyTableTitleCellProps = React.HTMLProps<HTMLTableCellElement> & {
  cellValue: React.ReactNode;
};

export const AdjacencyTableTitleCell = ({
  className,
  cellValue,
  ...props
}: AdjacencyTableTitleCellProps) => {
  return (
    <td
      className={cn(
        "relative border border-slate-300 bg-muted p-2 text-center font-semibold text-slate-700 dark:text-slate-200 min-w-10",
        className
      )}
      {...props}
    >
      {cellValue}
    </td>
  );
};
