import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dispatch, ActionType } from "../model/types";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

type ControlsProps = {
  dispatch: Dispatch;
  disabled?: boolean;
  activeType: ActionType | null;
  onSubmitValue: (value: number) => void;
};

type ControlColor = "blue" | "orange" | "red";

type CollapsibleControlProps = {
  type: ActionType;
  disabled?: boolean;
  color: ControlColor;
  onTriggerClick: (type: ActionType, value: number) => void;
  isOpen?: boolean;
  dispatch: Dispatch;
  onSubmitValue: (value: number) => void;
};

const CollapsibleControl = ({
  type,
  disabled,
  color,
  isOpen,
  onTriggerClick,
  onSubmitValue,
  dispatch,
}: CollapsibleControlProps) => {
  const [value, setValue] = useState<number | "">("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setValue(value === "" ? "" : Number(value));
    dispatch({ type, value: Number(value), canClose: false });
  };

  const handleOpen = () => {
    onTriggerClick(type, value || 0);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof value !== "number") return;
    onSubmitValue(value);
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={handleOpen}
      className=" space-y-2 flex flex-col items-center justify-center"
    >
      <CollapsibleTrigger asChild>
        <Button
          className={`px-2 w-28 md:w-40 capitalize`}
          variant={isOpen ? "outline" : "default"}
          onClick={() => {}}
          disabled={disabled}
        >
          {type}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent asChild>
        <form
          className="flex items-center justify-center gap-2"
          onSubmit={handleSubmit}
        >
          <Input
            className="w-12 md:w-20"
            value={value}
            onChange={handleChange}
            type="number"
            autoFocus
          />
          <Button
            className={`bg-${color}-500 hover:bg-${color}-400 text-white`}
            type="submit"
            disabled={disabled}
          >
            Go
          </Button>
        </form>
      </CollapsibleContent>
    </Collapsible>
  );
};

type ControlsType = { type: ActionType; color: ControlColor }[];

const CONTROLS: ControlsType = [
  { type: "find", color: "blue" },
  { type: "insert", color: "orange" },
  { type: "delete", color: "red" },
];

export const Controls = ({
  dispatch,
  disabled,
  activeType,
  onSubmitValue,
}: ControlsProps) => {
  const toggleActiveType = (type: ActionType, value: number) => {
    dispatch({ type, value, canClose: true });
  };

  return (
    <div className="mt-8">
      <div className="flex items-start justify-center w-full">
        {CONTROLS.map(({ type, color }) => {
          return (
            <CollapsibleControl
              key={type}
              type={type}
              color={color}
              disabled={disabled}
              onTriggerClick={toggleActiveType}
              isOpen={activeType === type}
              dispatch={dispatch}
              onSubmitValue={onSubmitValue}
            />
          );
        })}
      </div>
    </div>
  );
};
