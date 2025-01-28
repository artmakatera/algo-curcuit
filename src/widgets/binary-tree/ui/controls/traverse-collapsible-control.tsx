import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { CollapsibleControlProps } from "./types";
import { TabsContent } from "@/components/ui/tabs";

export const TraverseCollapsibleControl = ({
  type,
  disabled,
  color,
  onSubmitValue,
}: CollapsibleControlProps) => {
  return (
    <TabsContent className="mt-0" value={type}>
      <div className="flex items-center gap-2 p-2">
        <Button
          className={`bg-${color}-500 hover:bg-${color}-400 text-white h-10 uppercase`}
          disabled={disabled}
          onClick={() => {
            onSubmitValue(0);
          }}
        >
          {type}
        </Button>
      </div>
    </TabsContent>
  );
};
