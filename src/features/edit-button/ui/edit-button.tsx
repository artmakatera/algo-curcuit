import { CheckIcon, Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";

// Components
import { Button } from "@/components/ui/button";

// Helpers
import { cn } from "@/shared/lib/utils";
import { MouseEventHandler } from "react";

export type EditButtonProps<E extends MouseEventHandler | undefined> = {
  editMode: boolean;
  onClick?: E;
  disabled?: boolean;
};

export const EditButton = <E extends MouseEventHandler | undefined>({
  editMode,
  onClick,
  disabled,
}: EditButtonProps<E>) => {
  return (
    <Button
      className={cn(
        "ml-2 mb-0.5",
        editMode
          ? "bg-green-500 hover:bg-green-600"
          : "bg-orange-500 hover:bg-orange-600"
      )}
      variant="destructive"
      size="icon"
      title="Edit"
      onClick={onClick}
      disabled={disabled}
    >
      {editMode ? (
        <CheckIcon data-testid="close-edit-icon" className="h-4 w-4" />
      ) : (
        <Pencil1Icon data-testid="open-edit-icon" className="h-4 w-4" />
      )}
    </Button>
  );
};
