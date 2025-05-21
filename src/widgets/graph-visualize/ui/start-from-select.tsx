import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VertexBaseData } from "@/shared/types/data-structures";

type StartFromSelectProps = {
  value?: number;
  onChange: (value: string) => void;
  vertices?: VertexBaseData[];
  label?: string;
};

const StartFromSelect = ({
  value = 0,
  onChange,
  vertices = [],
  label = "Start From:",
}: StartFromSelectProps) => {
  return (
    <div className="grid  gap-1.5 grow max-w-3xs">
      <Label className="font-bold text-xs">
        {label}
      </Label>
      <Select onValueChange={onChange} defaultValue={String(value)}>
        <SelectTrigger data-testid="start-from-select" className="min-w-[100px] w-full">
          <SelectValue placeholder="Start From" />
        </SelectTrigger>
        <SelectContent>
          {vertices.map(({ value, id }, index) => (
            <SelectItem key={id} value={String(index)}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StartFromSelect;
