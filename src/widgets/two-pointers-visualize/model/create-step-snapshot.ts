import { LANGUAGES, STEPS } from "./constants";
import { GenValuePayload, StepSnapshot } from "./types";


export const createStepSnapshot = (payload: GenValuePayload, codeLang = LANGUAGES.javascript): StepSnapshot => {
  const { type, result, start, end,  } = payload;
  return {
    type,
    result,
    compareIndexes: [start ?? -1, end ?? -1],
  };
};

export const defaultSnapshots = [{
  type: STEPS.start,
  compareIndexes: [-1, -1],
  result: [],
}]; 