
import { CollapseType, ControlsProps, ControlsType } from "./types";
import { ActionType } from "../../model/types";
import { InputCollapsibleControl } from "./input-collapsible-control";
import { TraverseCollapsibleControl } from "./traverese-collapsible-control";





const CONTROLS: ControlsType = [
  { type: "bfs", color: "blue" },
  { type: "find", color: "blue" },
  { type: "insert", color: "orange" },
  { type: "delete", color: "red" },
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

  return (
    <div>
      <div className="flex items-start justify-center w-full">
        {CONTROLS.map(({ type, color }) => {

          if (type === "bfs" ) {
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
      </div>
    </div>
  );
};
