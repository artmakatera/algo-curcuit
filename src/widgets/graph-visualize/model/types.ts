import { BaseSnapshot } from "@/shared/types/snapshot";
import { STEPS } from "./constants";


export interface StepSnapshotPayload extends BaseSnapshot {
  type: typeof STEPS[keyof typeof STEPS],
  stack?: number[],
  queue?: number[],
  visited: boolean[],
  result: number[],
  checkingIndex?: number | null,
  fromIndexToCheck?: number | null,
}


export interface StepSnapshot extends StepSnapshotPayload {
  highlightLines: number[];
}
