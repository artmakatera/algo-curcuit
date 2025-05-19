import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { AddGraphVertex } from "../types";

export const AddRow = ({
  onAdd,
  disabled,
}: {
  disabled?: boolean;
  onAdd: AddGraphVertex;
  length: number;
}) => {
  const handleAdd = () => {
    onAdd();
  };

  return (
    <tr>
      <td className="bg-muted" />
      <td className=" p-2 bg-muted text-right" colSpan={100}>
        <Button
          className="flex-1 w-full"
          disabled={disabled}
          onClick={handleAdd}
        >
          <Plus />
          Add
        </Button>
      </td>
    </tr>
  );
};
