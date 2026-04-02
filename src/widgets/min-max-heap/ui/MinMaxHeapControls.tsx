import { type  SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { CounterInput } from "@/components/ui/counter-input";



interface MinMaxHeapControlsProps {
    value: number;
    onValueChange: (s: SetStateAction<number>) => void;
    onPush: () => void;
    onPop: () => void;
    onPeek: () => void;
}

export function MinMaxHeapControls(props: MinMaxHeapControlsProps) {
  const {
    value,
    onValueChange,
    onPush,
    onPop,
    onPeek,
  } = props;


  return (
          <div className="mt-8 flex place-content-center items-center divide-x-2 mx-auto [&>div]:px-4">
        <div className="flex gap-4">
          <CounterInput
            min={0}
            max={100}
            value={value}
            onChange={onValueChange}
          />
          <Button
            variant="destructive"
            className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
            onClick={onPush}
          >
            Push
          </Button>
        </div>

        <div>
          <Button
            variant="destructive"
            className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
            onClick={onPop}
          >
            Pop
          </Button>
        </div>
        <div>
          <Button
            variant="destructive"
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={onPeek}
          >
            Peek
          </Button>
        </div>
      </div>
  )
}