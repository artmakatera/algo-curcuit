import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TargetInput = {
  value: number;
  onChange: (v: string) => void;
};

export function TargetInput({ value, onChange }: TargetInput) {
  return (
    <div className="grid w-24 gap-1.5">
      <Label  className="font-bold" htmlFor="target">Target</Label>
      <Input type="number" id="target" value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
}