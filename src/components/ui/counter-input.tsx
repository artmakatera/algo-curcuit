"use client";
import { SetStateAction } from "react";
import { Button } from "./button";

import { Plus, Minus } from "lucide-react";

import { cn } from "@/shared/lib/utils";

export interface CounterInputProps {
  onChange: (s: SetStateAction<number>) => void
  className?: string;
  min: number;
  max: number;
  value?: number;
  
}

export const CounterInput = ({
  className,
  min = 0,
  max = 9999,
  value = 1,
  onChange,
}: CounterInputProps) => {
  const handleIncrement = () => {
    if (value !== undefined && value < max) {
      onChange(value => value + 1); 
    }
  };

  const handleDecrement = () => {
    if (value !== undefined && value > min) {
      onChange(value => value - 1);
    }
  };

  return (
    <div className={cn("inline-flex items-center gap-4", className)}>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleDecrement}
      >
        <Minus size={16} />
      </Button>
      {value}
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleIncrement}
      >
        <Plus size={16} />
      </Button>
    </div>
  );
};
