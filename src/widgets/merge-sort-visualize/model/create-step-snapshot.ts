import { StepSnapshot } from "./types";
import { STEPS } from "./constants";
// import { GenValuePayload, StepSnapshot, TreeArrayGroups } from "./types";

export const createStepSnapshot = (payload: StepSnapshot,): StepSnapshot => {
  return payload
};


const arr = [3, 2, 9, 4, 1, 8]



export const defaultSnapshot: StepSnapshot = {
  type: STEPS.start,
  firstArray: [] as number[] | number[][],
  secondArray: null as null | number[][],
  indexOfSourceSubArray: -1,
  indexOfTargetSubArray: -1,
  moveIndex: -1,
  targetIndex: -1,
  sourceIndexesToMerge: [],
}

export const defaultSnapshots = [defaultSnapshot]; 