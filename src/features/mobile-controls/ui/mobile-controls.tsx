import { cn } from "@/shared/lib/utils";
import { MobileControl } from "./mobile-control";

export interface MobileControlsProps {
  onClick: (type: string) => void;
  controls: {
    type: string;
    label: string;
    Icon: React.ReactNode;
  }[];
  activeType?: string | null;
}

export const MobileControls = ({ controls, onClick, activeType }: MobileControlsProps) => {
  return (
    <nav className="fixed left-0 bottom-0 w-full bg-background border-t border-background-300 lg:hidden">
      <ul className="flex gap-2 max-w-2xl mx-auto p-2">
        {controls.map(({ type, label, Icon }) => {
          return (
            <li className="flex-1" key={type}>
              <MobileControl
                Icon={Icon}
                label={label}
                onClick={() => onClick(type)}
                className={cn( "text-muted-foreground" , activeType === type && "text-accent-foreground font-semibold")}

              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
