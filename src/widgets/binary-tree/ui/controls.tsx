import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dispatch, ActionType } from "../model/types";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CollapsibleContent } from "@radix-ui/react-collapsible";

type ControlsProps = {
  dispatch: Dispatch;
  disabled?: boolean;
  activeType: ActionType | null;
  setActiveType: React.Dispatch<React.SetStateAction<ActionType | null>>;
};

type ControlColor = "blue" | "orange" | "red";

type CollapsibleControlProps = {
  type: ActionType;
  disabled?: boolean;
  color: ControlColor;
  onTriggerClick: (type: ActionType, value: boolean) => void;
  isOpen?: boolean;
  dispatch: Dispatch;
};

const CollapsibleControl = ({
  type,
  disabled,
  color,
  isOpen,
  onTriggerClick,
  dispatch,
}: CollapsibleControlProps) => {
  const [value, setValue] = useState<number>(40);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  const handleOpen = (value: boolean) => {
    onTriggerClick(type, value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type, value });
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={handleOpen}
      className=" space-y-2 flex flex-col items-center justify-center"
    >
      <CollapsibleTrigger asChild>
        <Button
          className={`px-2 w-40 capitalize`}
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
            className="w-20"
            value={value}
            onChange={handleChange}
            type="number"
          />
          <Button
            className={`bg-${color}-500 hover:bg-${color}-400 text-white`}
            type="submit"
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
  setActiveType,
}: ControlsProps) => {
  const toggleActiveType = (type: ActionType) => {
    setActiveType((activeType) => (activeType === type ? null : type));
  };

  return (
    <div>
      <div className="flex items-start justify-center w-full">
        {CONTROLS.map(({ type, color }) => (
          <CollapsibleControl
            key={type}
            type={type}
            color={color}
            disabled={disabled}
            onTriggerClick={toggleActiveType}
            isOpen={activeType === type}
            dispatch={dispatch}
          />
        ))}
      </div>
    </div>
  );
};
