"use client";
import { cn } from "@/shared/lib/utils";

// Constants
import { COMPARE_CLASSES } from "../constants";

export interface VisualArrayItemProps {
  value: number;

  index: number;
  indexToSwap?: number;
  className?: string;

  isComparing?: boolean;
  isSorted?: boolean;
  currentSortItem?: boolean;
  isGoBack?: boolean;
  isGoForward?: boolean;
  isPivot?: boolean;
  isChecking?: boolean;
}

export const VisualArrayItem = ({
  className,
  value,
  isComparing,
  indexToSwap = -1,
  isSorted,
  isChecking,
  isPivot,
  currentSortItem,
  isGoBack,
  isGoForward,
}: VisualArrayItemProps) => {
  return (
    <>
      <div
        className={cn(
          "min-w-12 h-12 relative flex items-center justify-center rounded-md border-2 border-gray-300 transition-transform duration-100 ",
          isComparing && COMPARE_CLASSES.COMPARING,
          indexToSwap > -1 && COMPARE_CLASSES.SWAPPING,
          isChecking && COMPARE_CLASSES.CHECKING,
          isSorted && COMPARE_CLASSES.SORTED,

          isPivot && "bg-yellow-500 text-white",
          currentSortItem && "translate-y-[-100%]",
          isGoBack && "item-go-back",
          isGoForward && "item-go-forward",
          className
        )}
      >
        <span className="text-sm p-2">{value}</span>
        {isPivot && (
          <p className="absolute left-0 -top-[28px] text-red-400">Pivot</p>
        )}
      </div>
    </>
  );
};

