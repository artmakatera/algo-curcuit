import { cn } from "@/shared/lib/utils";
import { ControlItem } from "./control-item";

export interface ControlPanelProps {
  onClick: (type: string) => void;
  controls: {
    type: string;
    label: string;
    Icon: React.ReactNode;
  }[];
  activeType?: string | null;
  className?: string;
}

export const ControlPanel = ({ controls, onClick, activeType, className }: ControlPanelProps) => {
  return (
    <nav className={cn("fixed left-0 bottom-0 w-full bg-background border-t border-background-300",
    "lg:backdrop-blur-sm lg:max-w-xl lg:left-1/2 lg:bottom-6 lg:-translate-x-1/2 lg:rounded-lg lg:shadow-lg",
    className)}>
      <ul className="flex gap-2 max-w-2xl mx-auto p-1">
        {controls.map(({ type, label, Icon }) => {
          return (
            <li className="flex-1" key={type}>
              <ControlItem
                Icon={Icon}
                label={label}
                onClick={() => onClick(type)}
                className={cn( "text-muted-foreground" , activeType === type && "text-accent-foreground font-bold")}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
