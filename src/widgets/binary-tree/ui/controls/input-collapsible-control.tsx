import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { CollapsibleControlProps } from "./types";
import { ActionType } from "../../model/types";

export const InputCollapsibleControl = ({
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
    if (value.length > 4) {
      return;
    }

    setValue(value === "" ? "" : Number(value));
    dispatch({ type: type as ActionType, value: Number(value), canClose: false });
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
            max={9999}
            min={-999}
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