import { CollapseType, ControlsProps } from "./types";
import { ActionType } from "../../model/types";
import { ToggleMenu } from "@/components/ui/toggle-menu";

import { CONTROLS } from "./constants";
import { CollapsibleControl } from "./collapsible-control";
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
  onChangeSpeed,
}: ControlsProps) => {

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
    toggleActiveType(type as ActionType, 1);
    dispatch({ type: type as ActionType, value: 1, canClose: false });
  };

  const onSubmitValue = (value: number, type?: ActionType) => {
    onSubmitValueProp(value, type);
  };

  // Find the current control based on active type
  const currentControl = CONTROLS.find(
    (control) => {
      const hasByTabType = control.tabType && activeType?.includes(control.tabType);
      return control.type === activeType || hasByTabType;
    }
  );

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      <ToggleMenu
        className="-mx-2"
        value={getToggleType(activeType)}
        onValueChange={handleValueChange}
        menuItems={menuItems}
      />
      {currentControl && (
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
        </div>
      )}
    </div>
  );
};


function getToggleType(activeType: string | null): ActionType | null {
  if (!activeType) return null;
  if (activeType.includes("traverse")) return ActionType.bfs;
  return activeType as ActionType;
}