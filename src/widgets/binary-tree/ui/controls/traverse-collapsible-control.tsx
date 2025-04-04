import { Button } from "@/components/ui/button";
import { CollapsibleControlProps } from "./types";

export const TraverseCollapsibleControl = ({
  type,
  disabled,
  color,
  onSubmitValue,
}: CollapsibleControlProps) => {
  return (
      <div className="flex items-center gap-2 p-2">
        <Button
          className={`bg-${color}-500 hover:bg-${color}-400 text-white h-10 uppercase`}
          disabled={disabled}
          onClick={() => {
            onSubmitValue(0);
          }}
        >
          {type}
        </Button>
      </div>
  );
};
