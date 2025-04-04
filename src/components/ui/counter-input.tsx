"use client";
import { Input, InputProps } from "./input";
import { Button } from "./button";

import { Plus, Minus } from "lucide-react";

export interface CounterInputProps extends InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CounterInput = ({
  className,
  min = 0,
  max = 9999,
  value,
  onChange,
  ...props
}: CounterInputProps) => {

  const handleIncrement = () => {
    if (value !== undefined && value < max) {
      onChange({ target: { value: String(+value + 1) } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleDecrement = () => {
    if (value !== undefined && value > min) {
      onChange({ target: { value: String(+value - 1) } } as React.ChangeEvent<HTMLInputElement>);
    }
  };


  return (
    <div className="flex items-center gap-2">
      <Button type="button" variant="outline" size="icon" onClick={handleDecrement}>
        <Minus size={16} />
      </Button>
      <Input
        type="number"
        className={className}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        {...props}
      />
      <Button type="button" variant="outline" size="icon" onClick={handleIncrement}>
        <Plus size={16} />
      </Button>
    </div>
  );
}