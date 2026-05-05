"use client";
import { SetStateAction } from "react";
import { Button } from "./button";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export interface CounterInputProps <A extends boolean = false> {
  onChange: (s: SetStateAction<A extends true ? number | string : number>) => void;
  allowEmpty?: A;
  className?: string;
  min?: number;
  max?: number;
  value?: A extends true ? number | string : number;
}

export const CounterInput = <A extends boolean = false>({
  allowEmpty,
  className,
  min = 0,
  max = 999,
  value = 1,
  onChange,
}: CounterInputProps<A>) => {
  return (
    <div className={cn("inline-flex items-center", className)}>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => onChange((v) => typeof v === "number" && v > min ? v - 1 : v)}
        disabled={typeof value === "number"? value <= min : true}
      >
        <Minus size={16} />
      </Button>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {

          const value = e.target.value;

          if (value === "" && allowEmpty) {
            onChange("" as SetStateAction<A extends true ? number | string : number>);
            return;
          }
          const n = parseInt(value, 10);

          if (isNaN(n) || n < min || n > max) {
            return;
          }

          if (!isNaN(n)) onChange(Math.min(Math.max(n, min), max));
        }}
        className="h-9 w-14 rounded-md border bg-background px-2 py-1 text-center text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => onChange((v) => typeof v === "number" && v < max ? v + 1 : v)}
        disabled={typeof value === "number"? value >= max : true}
      >
        <Plus size={16} />
      </Button>
    </div>
  );
};
