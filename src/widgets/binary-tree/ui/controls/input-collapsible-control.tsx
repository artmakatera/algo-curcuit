import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CollapsibleControlProps } from "./types";
import { ActionType } from "../../model/types";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";

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
   <TabsContent value={type}>
        <form
          className="flex items-center gap-2 p-2"
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
    </TabsContent>
  );
};