


import { LANGUAGES, STEPS } from "./constants";
import { languagesMapSettings as baseObject } from "./dfs/languages-map-settings";
import { StepSnapshot, StepSnapshotPayload } from "./types";



export const createStepSnapshot = (languagesMapSettings: typeof baseObject, codeLang: keyof typeof baseObject = LANGUAGES.javascript) => (payload: StepSnapshotPayload): StepSnapshot => {
  const { type, stack, visited, checkingIndex, result, fromIndexToCheck, queue } = payload;
  return {
    type,
    stack,
    visited,
    result,
    checkingIndex,
    fromIndexToCheck,
    queue,
    highlightLines: languagesMapSettings[codeLang]?.highlightLines[type] || [],
  };
};

export const defaultSnapshots: StepSnapshot[] = [{
  type: STEPS.start,
  checkingIndex: null,
  fromIndexToCheck: null,
  stack: [],
  visited: [],
  result: [],
  highlightLines: [],
}];