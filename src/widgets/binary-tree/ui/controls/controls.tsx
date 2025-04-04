import { CollapseType, ControlsProps, } from "./types";
import { ActionType } from "../../model/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { InputCollapsibleControl } from "./input-collapsible-control";
import { TraverseCollapsibleControl } from "./traverse-collapsible-control";
import { CONTROLS } from "./constants";
import { MobileControls } from "@/features/mobile-controls";
import { useState } from "react";
import { MobileControlDialog } from "./mobile-control-dialog";



export const Controls = ({
  dispatch,
  disabled,
  activeType,
  onSubmitValue:onSubmitValueProp,
}: ControlsProps) => {
  const [openMobileDialog, setOpenMobileDialog] = useState(false);
  const toggleActiveType = (type: CollapseType, value: number) => {
    dispatch({ type: type as ActionType, value, canClose: true });
  };

  const handleValueChange = (type: string) => {
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
  }

  return (
    <div>
      <Tabs
        className="w-full scale-75 sm:scale-100 hidden lg:block"
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
              <TabsContent key={type} value={type}>
                <TraverseCollapsibleControl
                  key={type}
                  type={type}
                  color={color}
                  disabled={disabled}
                  dispatch={dispatch}
                  onSubmitValue={onSubmitValue}
                />
              </TabsContent>
            );
          }

          return (
            <TabsContent key={type} value={type}>
              <InputCollapsibleControl
                key={type}
                type={type}
                color={color}
                disabled={disabled}
                dispatch={dispatch}
                onSubmitValue={onSubmitValue}
              />
            </TabsContent>
          );
        })}
      </Tabs>
      <MobileControls
        activeType={activeType}
        controls={CONTROLS}
        onClick={handleMobileDialogOpen}
      />
      <MobileControlDialog 
        open={openMobileDialog}
        type={activeType as ActionType}
        label={activeType as string}
        onClose={() => setOpenMobileDialog(false)}
        dispatch={dispatch}
        onSubmitValue={onSubmitValue}
        disabled={disabled}
      />
    </div>
  );
};
