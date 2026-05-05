import { STEPS } from "./constants";
import { GenValuePayload, StepSnapshot } from "./types";

export const createStepSnapshot = (payload: GenValuePayload): StepSnapshot => {
  const { type, value, index, compareIndexes, swapIndexes, removeIndex, heap } = payload;

  return {
    type,
    value,
    index,
    compareIndexes,
    swapIndexes,
    removeIndex,
    heap,
    node: null,
  };
};

export const defaultSnapshot: StepSnapshot = {
  type: STEPS.startTraverse,
  value: -1,
  index: -1,
  compareIndexes: [],
  swapIndexes: [],
  removeIndex: -1,
  heap: [],
  node: null,
};

export const defaultSnapshots = [defaultSnapshot];
