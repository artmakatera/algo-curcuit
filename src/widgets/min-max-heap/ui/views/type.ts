import { ActionType, StepSnapshot } from "../../model/types";

export interface MinMaxHeapViewProps {
    activeType: React.RefObject<ActionType | null>;
    currentSnapshot: StepSnapshot;
    delayRef: React.RefObject<string | null>;
}