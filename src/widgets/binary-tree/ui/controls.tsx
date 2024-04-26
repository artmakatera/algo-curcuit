import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dispatch, ActionType } from "../model/types";

type ControlsProps = {
  dispatch: Dispatch;
  disabled?: boolean;
};

export const Controls = ({ dispatch, disabled }: ControlsProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = (type: ActionType) => {
    if (ref.current) {
      dispatch({ type, value: Number(ref.current.value) });
    }
  };

  return (
    <div>
      {/* <Label>Control:</Label> */}
      <div className="flex items-center justify-center gap-1 w-full">
        <Input
          ref={ref}
          className="w-20"
          onChange={() => {}}
          type="number"
          id="insert-node"
          disabled={disabled}
        />
        <Button
          className="px-2 bg-blue-500 hover:bg-blue-400"
          onClick={() => handleClick("find")}
          disabled={disabled}
        >
          Find
        </Button>
        <Button
          className="px-2 bg-orange-500 hover:bg-orange-400"
          onClick={() => handleClick("insert")}
          disabled={disabled}
        >
          Insert
        </Button>
        <Button
          className="px-2 bg-red-500 hover:bg-red-400"
          onClick={() => handleClick("delete")}
          disabled={disabled}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
