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
};

const StartFromSelect = ({
  value = 0,
  onChange,
  vertices = [],
}: StartFromSelectProps) => {
  return (
    <Select onValueChange={onChange} defaultValue={String(value)}>
      <SelectTrigger data-testid="start-from-select" className="w-[80px]">
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
  );
};

export default StartFromSelect;
