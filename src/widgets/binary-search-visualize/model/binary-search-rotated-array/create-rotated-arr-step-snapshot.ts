import { GenValuePayload, StepSnapshot } from "../types";


export const createRotatedBSStepSnapshot = (payload: GenValuePayload): StepSnapshot => {
  const { type, result, start, end, middleIndex } = payload;
  return {
    type,
    result,
    compareIndexes: [start ?? -1, end ?? -1],
    checkIndex: middleIndex ?? -1,
  };
};