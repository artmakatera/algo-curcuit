import { type SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { CounterInput } from "@/components/ui/counter-input";

interface MinMaxHeapControlsProps {
  value: number | string;
  disabled?: boolean;
  onValueChange: (s: SetStateAction<number | string>) => void;
  onPush: () => void;
  onPop: () => void;
  onPeek: () => void;
}

export function MinMaxHeapControls(props: MinMaxHeapControlsProps) {
  const { value, onValueChange, onPush, onPop, onPeek, disabled } = props;

  return (
    <div className=" flex flex-wrap items-center gap-2">
      <div className="flex gap-4">
        <CounterInput
          min={0}
          max={999}
          value={value}
          onChange={onValueChange}
          allowEmpty
        />
        <Button
          variant="destructive"
          className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
          onClick={onPush}
          disabled={disabled}
        >
          Push
        </Button>
      </div>

      <div>
        <Button
          variant="destructive"
          className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
          onClick={onPop}
          disabled={disabled}
        >
          Pop
        </Button>
      </div>
      <div>
        <Button
          variant="destructive"
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          onClick={onPeek}
          disabled={disabled}
        >
          Peek
        </Button>
      </div>
    </div>
  );
}
