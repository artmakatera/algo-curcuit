import { CollapseType, ControlsProps } from "./types";
import { ActionType } from "../../model/types";
import { ToggleMenu } from "@/components/ui/toggle-menu";

import { CONTROLS, DEFAULT_TRAVERSE_TYPE } from "./constants";
import { useState } from "react";
import { CollapsibleControl } from "./collapsible-control";
import { isTraverseType } from "./helpers";
import { VisualizeControls } from "@/features/visualizer-player-controls";

export const Controls = ({
  dispatch,
  disabled,
  activeType,
  onSubmitValue: onSubmitValueProp,
  isPlaying,
hasPrevSnapshot,
hasNextSnapshot,
isResetDisabled,
speed,
onPreviousStep,
onNextStep,
onChangeSpeed
}: ControlsProps) => {
  const [currentActiveType, setCurrentActiveType] = useState<string>(
    isTraverseType(activeType) ? DEFAULT_TRAVERSE_TYPE : (activeType as string) || CONTROLS[0].type
  );

  // Transform CONTROLS to ToggleMenu format
  const menuItems = CONTROLS.map((control) => ({
    label: control.label,
    value: control.type,
    icon: control.Icon,
  }));

  const toggleActiveType = (type: CollapseType, value: number) => {
    dispatch({ type: type as ActionType, value, canClose: true });
  };

  const handleValueChange = (type: string) => {
    setCurrentActiveType(type);
    toggleActiveType(type as ActionType, 1);
    dispatch({ type: type as ActionType, value: 1, canClose: false });
  };



  const onSubmitValue = (value: number, type?: ActionType) => {
    onSubmitValueProp(value, type);
  };

  // Find the current control based on active type
  const currentControl = CONTROLS.find(control => control.type === currentActiveType) || CONTROLS[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        <ToggleMenu
          className="-mx-2"
          value={currentActiveType}
          onValueChange={handleValueChange}
          menuItems={menuItems}
        />
        <div className="p-4 flex gap-1 sm:gap-2 items-center ">
          <CollapsibleControl
            key={currentControl.type}
            type={currentControl.type}
            color={currentControl.color}
            disabled={disabled}
            dispatch={dispatch}
            onSubmitValue={onSubmitValue}
            onTypeChange={handleValueChange}
          />
          {currentActiveType && (
            <VisualizeControls
              onPreviousStep={onPreviousStep}
              onNextStep={onNextStep}
              isPlaying={isPlaying}
              isResetDisabled={isResetDisabled}
              isPreviousStepDisabled={!hasPrevSnapshot}
              isNextStepDisabled={!hasNextSnapshot}
              speed={speed}
              onChangeSpeed={onChangeSpeed}
            />
        )}
      </div>
    </div>
  );
};
