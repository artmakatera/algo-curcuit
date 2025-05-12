// import { ControlPanel } from "@/features/control-panel/ui/control-panel";
import { ControlPanel } from "@/features/control-panel";
import { Combine } from "lucide-react";

export const CONTROLS = [
  {
    label: "Traverse",
    color: "blue",
    Icon: <Combine />,
    type: "traverse",
  },
];

export const Controls = () => {
  return (
    <ControlPanel
      // activeType={activeType}
      controls={CONTROLS}
      onClick={() => {}}
    />
  );
};
