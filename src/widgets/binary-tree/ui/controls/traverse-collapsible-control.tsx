import { Button } from "@/components/ui/button";
import { CollapsibleControlProps } from "./types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEFAULT_TRAVERSE_TYPE, TRAVERSE_OPTIONS } from "./constants";

export const TraverseCollapsibleControl = ({
  type,
  disabled,
  color,
  onSubmitValue,
  onTypeChange,
}: CollapsibleControlProps) => {
  return (
    <div className="flex items-center gap-2 p-2">
      <Select
        onValueChange={onTypeChange}
        defaultValue={DEFAULT_TRAVERSE_TYPE}
        disabled={disabled}
      >
        <SelectTrigger data-testid="speed-select" className="w-32">
          <SelectValue placeholder="Speed" />
        </SelectTrigger>
        <SelectContent>
          {TRAVERSE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        className={`bg-${color}-500 hover:bg-${color}-400 text-white h-10 uppercase`}
        disabled={disabled}
        onClick={() => {
          onSubmitValue(0);
        }}
      >
        Go
      </Button>
    </div>
  );
};
