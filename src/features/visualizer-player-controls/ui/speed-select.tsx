import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SPEED_OPTIONS = [
  { value: "1500", label: "1x" },
  { value: "1000", label: "2x" },
  { value: "750", label: "3x" },
  { value: "500", label: "4x" },
  { value: "250", label: "5x" },
];

type SpeedSelectProps = {
  value?: string;
  onChange: (value: string) => void;
};

const SpeedSelect = ({ value = "1500", onChange }: SpeedSelectProps) => {
  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger data-testid="speed-select" className="w-[68px] sm:w-[80px]">
        <SelectValue placeholder="Speed" />
      </SelectTrigger>
      <SelectContent>
        {SPEED_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SpeedSelect;
