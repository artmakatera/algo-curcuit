import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ActionType, Dispatch } from "../../model/types";
import { CONTROLS_BY_TYPE } from "./constants";
import { InputCollapsibleControl } from "./input-collapsible-control";

interface MobileControlDialogProps {
  open: boolean;
  type: ActionType;
  label: string;
  onClose: () => void;
  disabled?: boolean;
  onSubmitValue: (value: number, type?: ActionType) => void;
  dispatch: Dispatch;
}

export const MobileControlDialog = ({
  open,
  type,
  label,
  onClose,
  disabled,
  onSubmitValue,
  dispatch,
}: MobileControlDialogProps) => {
  const { color } = CONTROLS_BY_TYPE[type] || {};

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-screen min-h-screen bg-background/80 place-content-start">
        {/* Add your mobile control dialog header here */}
        {/* Add your mobile control dialog content here */}
        <DialogHeader>
          <DialogTitle className="capitalize">{label}</DialogTitle>
        </DialogHeader>
        <div>
          {/* Add your mobile control buttons here */}
          <InputCollapsibleControl
            key={type}
            type={type}
            color={color}
            disabled={disabled}
            dispatch={dispatch}
            onSubmitValue={onSubmitValue}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
