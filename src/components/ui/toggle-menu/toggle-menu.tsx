import { Toggle } from "./toggle";
import { ToggleMenuItem } from "./types";

export interface ToggleMenuProps {
  value: string;
  onValueChange: (value: string) => void;
  menuItems: ToggleMenuItem[];
}

export const ToggleMenu = ({
  value,
  onValueChange,
  menuItems,
}: ToggleMenuProps) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex overflow-x-auto scrollbar-hide-custom bg-muted/50 rounded-lg p-1 gap-1 min-w-0 max-w-full">
        <div className="flex gap-1 min-w-max">
          {menuItems.map((item) => (
            <Toggle
              key={item.value}
              pressed={value === item.value}
              onPressedChange={() => onValueChange(item.value)}
              aria-label={item.label}
              className={`flex items-center gap-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground`}
            >
              {item.icon}
              {item.label}
            </Toggle>
          ))}
        </div>
      </div>
    </div>
  );
};
