import { CollapseType, ControlsProps } from "./types";
import { ActionType } from "../../model/types";
import { ToggleMenu } from "@/components/ui/toggle-menu";

import { CONTROLS, DEFAULT_TRAVERSE_TYPE } from "./constants";
import { ControlPanel } from "@/features/control-panel";
import { useState } from "react";
import { MobileControlDialog } from "./mobile-control-dialog";
import { CollapsibleControl } from "./collapsible-control";
import { isTraverseType } from "./helpers";

export const Controls = ({
  dispatch,
  disabled,
  activeType,
  onSubmitValue: onSubmitValueProp,
}: ControlsProps) => {
  const [openMobileDialog, setOpenMobileDialog] = useState(false);
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

  const handleMobileDialogOpen = (type: string) => {
    setOpenMobileDialog(true);
    handleValueChange(type);
  };

  const onSubmitValue = (value: number, type?: ActionType) => {
    onSubmitValueProp(value, type);
    setOpenMobileDialog(false);
  };

  // Find the current control based on active type
  const currentControl = CONTROLS.find(control => control.type === currentActiveType) || CONTROLS[0];

  return (
    <div className="w-full max-w-2xl mx-auto ">
      
        <ToggleMenu
          value={currentActiveType}
          onValueChange={handleValueChange}
          menuItems={menuItems}
        />
        <div className="p-4">
          <CollapsibleControl
            key={currentControl.type}
            type={currentControl.type}
            color={currentControl.color}
            disabled={disabled}
            dispatch={dispatch}
            onSubmitValue={onSubmitValue}
            onTypeChange={handleValueChange}
          />
      </div>
      {/* <ControlPanel
        activeType={activeType}
        controls={CONTROLS}
        onClick={handleMobileDialogOpen}
        className="lg:hidden"
      />
      <MobileControlDialog
        open={openMobileDialog}
        type={activeType as ActionType}
        onClose={() => setOpenMobileDialog(false)}
        dispatch={dispatch}
        onSubmitValue={onSubmitValue}
        disabled={disabled}
        onTypeChange={handleValueChange}
      /> */}
    </div>
  );
};
