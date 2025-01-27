import { CollapseType, ControlsProps, ControlsType } from "./types";
import { ActionType } from "../../model/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { InputCollapsibleControl } from "./input-collapsible-control";
import { TraverseCollapsibleControl } from "./traverese-collapsible-control";

const CONTROLS: ControlsType = [
  { label: "Traverse", type: "bfs", color: "blue" },
  { label: "find", type: "find", color: "blue" },
  { label: "insert", type: "insert", color: "orange" },
  { label: "delete", type: "delete", color: "red" },
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
        defaultValue="bfs"
        className="w-full"
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
          if (type === "bfs") {
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

  // return (
  //   <div>
  //     <div className="flex items-start justify-center w-full">
  //       {CONTROLS.map(({ type, color }) => {

  //         if (type === "bfs" ) {
  //           return (
  //             <TraverseCollapsibleControl
  //               key={type}
  //               type={type}
  //               color={color}
  //               disabled={disabled}
  //               onTriggerClick={toggleActiveType}
  //               isOpen={activeType === type}
  //               dispatch={dispatch}
  //               onSubmitValue={onSubmitValue}
  //             />
  //           );
  //         }

  //         return (
  //           <InputCollapsibleControl
  //             key={type}
  //             type={type}
  //             color={color}
  //             disabled={disabled}
  //             onTriggerClick={toggleActiveType}
  //             isOpen={activeType === type}
  //             dispatch={dispatch}
  //             onSubmitValue={onSubmitValue}
  //           />
  //         );
  //       })}
  //     </div>
  //   </div>
  // );
};
