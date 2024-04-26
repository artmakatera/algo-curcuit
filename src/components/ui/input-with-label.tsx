import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InputWithLabelProps = InputProps & {
  label: string;
  id: string;
};

export const InputWithLabel = ({
  label,
  id,
  ...props
}: InputWithLabelProps) => {
  return (
    <div className="grid w-24 gap-1.5">
      <Label className="font-bold" id={id}>
        {label}
      </Label>
      <Input aria-labelledby={id} {...props} />
    </div>
  );
};
