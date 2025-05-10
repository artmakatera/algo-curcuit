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
    <div className="w-full p-2 bg-muted">
      <Button
        variant="destructive"
        className="w-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
        onClick={onClick}
        disabled={disabled}
      >
        Add <Plus />
      </Button>
    </div>
  );
};
