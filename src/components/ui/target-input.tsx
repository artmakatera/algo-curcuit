import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/shared/lib/utils";

type TargetInput = {
  value: number | "";
  onChange: (v: string) => void;
  disabled?: boolean;
};

export function TargetInput({ value, onChange, disabled }: TargetInput) {
  return (
    <div className="grid w-24 gap-1.5">
      <Label className="font-bold" id="target">
        Target
      </Label>
      <Input
        type="number"
        aria-labelledby="target"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={cn(disabled && "border-none font-bold")}
      />
    </div>
  );
}
