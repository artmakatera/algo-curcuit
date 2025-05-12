


// import { LANGUAGES } from "./constants";
// import { LanguagesMapKeys, languagesRotatedMapSettings } from "./languages-map-settings";
import { stack } from "d3";
import { LANGUAGES, STEPS } from "./constants";
import { languagesMapSettings as baseObject } from "./dfs/languages-map-settings";
import { StepSnapshot, StepSnapshotPayload } from "./types";

// import { StepSnapshot, StepSnapshotPayload } from "./types";


export const createStepSnapshot = (languagesMapSettings: typeof baseObject, codeLang: keyof typeof baseObject = LANGUAGES.javascript) => (payload: StepSnapshotPayload): StepSnapshot => {
  const { type, stack, visited, result } = payload;
  return {
    type,
    stack,
    visited,
    result,
    highlightLines: languagesMapSettings[codeLang]?.highlightLines[type] || [],
  };
};

export const defaultSnapshots: StepSnapshot[] = [{
  type: STEPS.start,
  stack: [],
  visited: [],
  result: [],
  highlightLines: [],
}];