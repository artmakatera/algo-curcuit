import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ActionType, Dispatch } from "../../model/types";
import { CONTROLS_BY_TYPE, getControlByType } from "./constants";
import { InputCollapsibleControl } from "./input-collapsible-control";
import { CollapsibleControl } from "./collapsible-control";

interface MobileControlDialogProps {
  open: boolean;
  type: ActionType;
  onClose: () => void;
  disabled?: boolean;
  onSubmitValue: (value: number, type?: ActionType) => void;
  dispatch: Dispatch;
  onTypeChange: (type: ActionType) => void;
}

export const MobileControlDialog = ({
  open,
  type,
  onClose,
  disabled,
  onSubmitValue,
  dispatch,
  onTypeChange,
}: MobileControlDialogProps) => {
  const { color, label } = getControlByType(type);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="top-0 translate-y-0 h-auto p-0 bg-background/60 items-start">
      
        <div className="W-full bg-background p-6">
          <DialogTitle className="capitalize shadow-2xl mb-6">{label}</DialogTitle>
          <CollapsibleControl
            key={type}
            type={type}
            color={color}
            disabled={disabled}
            dispatch={dispatch}
            onSubmitValue={onSubmitValue}
            onTypeChange={onTypeChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
