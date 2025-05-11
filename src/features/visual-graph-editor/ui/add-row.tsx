import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

export const AddRow = ({
  onClick,
  disabled
}: {
  disabled?: boolean
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <tr >
      <td className="w-full p-2 bg-muted" colSpan={100}>

      <Button
        className="w-full"
        onClick={onClick}
        disabled={disabled}
        >
        <Plus />
        Add 
      </Button>
        </td>
    </tr>
  );
};
