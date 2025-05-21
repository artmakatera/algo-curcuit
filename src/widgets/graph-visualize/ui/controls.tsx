import {
  VisualizeControls,
  VisualizeControlsProps,
} from "@/features/visualizer-player-controls";
import StartFromSelect from "./start-from-select";
import { VertexBaseData } from "@/shared/types/data-structures";
import { cn } from "@/shared/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ControlsProps extends VisualizeControlsProps {
  isEditMode: boolean;
  startFrom: number;
  setStartFrom: (value: number) => void;
  vertices: VertexBaseData[];
  isLoop?: boolean;
  setIsLoop?: (value: boolean) => void;
  isUndirected?: boolean;
  setIsUndirected?: (value: boolean) => void;
}

export const Controls = ({
  isEditMode,
  startFrom,
  setStartFrom,
  vertices,
  isLoop,
  setIsLoop,
  isUndirected,
  setIsUndirected,
  ...props
}: ControlsProps) => {
  const wrapperClassName = cn(
    "h-[58px] m-6 flex flex-wrap gap-4 mx-auto max-w-xl items-end justify-center"
  );
  if (isEditMode) {
    return (
      <div className={cn(wrapperClassName, "items-start pt-2")}>
        <div className="flex items-center space-x-2">
          <Switch id="is-undirected-graph" checked={isUndirected} onCheckedChange={setIsUndirected} />
          <Label htmlFor="is-undirected-graph">Undirected</Label>
        </div>
        {/* <div className="flex items-center space-x-2">
          <Switch id="is-loop-graph" checked={isLoop} onCheckedChange={setIsLoop} />
          <Label htmlFor="is-loop-graph">Loop</Label>
        </div> */}
      </div>
    );
  }
  return (
    <div className={wrapperClassName}>
      <StartFromSelect
        value={startFrom}
        onChange={(value) => setStartFrom(+value)}
        vertices={vertices}
      />

      <VisualizeControls {...props} />
    </div>
  );
};
