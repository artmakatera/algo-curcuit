import { STEPS } from "./constants"


export type StepSnapshotPayload = {
  type: Partial<STEPS>;
  compareIndexes: number[];
  swapIndexes: number[];
  sortedIndex?: number;
  array: number[];
};

export type StepSnapshot = StepSnapshotPayload & {
  highlightLines: number[];
};


export type GenValue = Generator<StepSnapshot, void, number>;


