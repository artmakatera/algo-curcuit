import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { CollapsibleControlProps } from "./types";

export const TraverseCollapsibleControl = ({
  type,
  disabled,
  color,
  isOpen,
  onTriggerClick,
  dispatch,
  onSubmitValue,
}: CollapsibleControlProps) => {

  const handleOpen = () => {
    onTriggerClick(type, 0);
    dispatch({ type: type, value: 0, canClose: false });
  };



  return (
    <Collapsible
      open={isOpen}
      onOpenChange={handleOpen}
      className=" space-y-2 flex flex-col items-center justify-center"
    >
      <CollapsibleTrigger asChild>
        <Button
          className={`px-2 w-28 md:w-40 capitalize`}
          variant={isOpen ? "outline" : "default"}
          onClick={() => {}}
          disabled={disabled}
        >
          {type}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent asChild>
      
          <Button
            className={`bg-${color}-500 hover:bg-${color}-400 text-white w-full`}
            disabled={disabled}
            onClick={() => {
              onSubmitValue(0);

            }}
          >
            Start
          </Button>
      </CollapsibleContent>
    </Collapsible>
  );
};