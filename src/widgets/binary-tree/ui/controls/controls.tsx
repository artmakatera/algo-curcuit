import { CollapseType, ControlsProps, ControlsType } from "./types";
import { ActionType } from "../../model/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { InputCollapsibleControl } from "./input-collapsible-control";
import { TraverseCollapsibleControl } from "./traverse-collapsible-control";

const CONTROLS: ControlsType = [
  { label: "find", type: "find", color: "blue" },
  { label: "Add", type: "insert", color: "orange" },
  { label: "delete", type: "delete", color: "red" },
  { label: "Level Order", type: "bfs", color: "blue" },
  { label: "Preorder", type: "dfs", color: "blue" },
];

export const Controls = ({
  dispatch,
  disabled,
  activeType,
  onSubmitValue,
}: ControlsProps) => {
  const toggleActiveType = (type: CollapseType, value: number) => {
    dispatch({ type: type as ActionType, value, canClose: true });
  };

  const handleValueChange = (type: string) => {
    toggleActiveType(type as ActionType, 0);
    dispatch({ type: type as ActionType, value: 0, canClose: false });
  };

  return (
    <div>
      <Tabs
        className="w-full scale-75 sm:scale-100"
        onValueChange={handleValueChange}
      >
        <TabsList>
          {CONTROLS.map(({ type, label }) => {
            return (
              <TabsTrigger className="capitalize" key={type} value={type}>
                {label}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {CONTROLS.map(({ type, color }) => {
          if (type === "bfs" || type === "dfs") {
            return (
              <TraverseCollapsibleControl
                key={type}
                type={type}
                color={color}
                disabled={disabled}
                onTriggerClick={toggleActiveType}
                isOpen={activeType === type}
                dispatch={dispatch}
                onSubmitValue={onSubmitValue}
              />
            );
          }

          return (
            <InputCollapsibleControl
              key={type}
              type={type}
              color={color}
              disabled={disabled}
              onTriggerClick={toggleActiveType}
              isOpen={activeType === type}
              dispatch={dispatch}
              onSubmitValue={onSubmitValue}
            />
          );
        })}
      </Tabs>
    </div>
  );
};
