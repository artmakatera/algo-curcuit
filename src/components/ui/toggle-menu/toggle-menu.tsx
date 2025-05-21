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
    <div className="flex border rounded-md p-1 gap-1 w-max max-w-full mx-auto">
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
  );
};

/* <Toggle
          pressed={mode === "edit"}
          onPressedChange={() => setMode("edit")}
          aria-label="Edit mode"
          className={`flex items-center gap-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground`}
        >
          <Edit className="h-4 w-4" />
          Edit
        </Toggle>
        <Toggle
          pressed={mode === "dfs"}
          onPressedChange={() => setMode("dfs")}
          aria-label="DFS mode"
          className={`flex items-center gap-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground`}
        >
          <GitBranch className="h-4 w-4" />
          DFS
        </Toggle>
        <Toggle
          pressed={mode === "bfs"}
          onPressedChange={() => setMode("bfs")}
          aria-label="BFS mode"
          className={`flex items-center gap-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground`}
        >
          <Search className="h-4 w-4" />
          BFS
        </Toggle> */
