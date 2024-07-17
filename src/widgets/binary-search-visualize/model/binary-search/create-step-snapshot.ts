import { LANGUAGES, STEPS } from "../constants";
import { LanguagesMapKeys } from "./languages-map-settings";
import { GenValuePayload, StepSnapshot } from "../types";


export const createBinarySearchStepSnapshot = (payload: GenValuePayload, codeLang: LanguagesMapKeys = LANGUAGES.javascript): StepSnapshot => {
  const { type, result, start, end, middleIndex } = payload;
  return {
    type,
    result,
    compareIndexes: [start ?? -1, end ?? -1],
    checkIndex: middleIndex ?? -1,
  };
};

export const defaultSnapshots = [{
  type: STEPS.start,
  compareIndexes: [-1, -1],
  checkIndex: -1,
  result: -1,
}]; 