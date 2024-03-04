


// import { LANGUAGES } from "./constants";
// import { LanguagesMapKeys, languagesRotatedMapSettings } from "./languages-map-settings";
import { LANGUAGES, STEPS } from "./constants";
import { LanguagesMapKeys, languagesMapSettings } from "./languages-map-settings";
import { StepSnapshot, StepSnapshotPayload } from "./types";


export const createStepSnapshot = (payload: StepSnapshotPayload, codeLang: LanguagesMapKeys = LANGUAGES.javascript): StepSnapshot => {
  const { type, compareIndexes, swapIndexes,
    sortedIndex, array, } = payload;
  return {
    type,
    compareIndexes,
    swapIndexes,
    sortedIndex,
    array,
    highlightLines: languagesMapSettings[codeLang]?.highlightLines[type] || [],
  };
};

export const defaultSnapshots = [{
  type: STEPS.start,
  compareIndexes: [] as number[],
  swapIndexes: [] as number[],
  sortedIndex: 0,
  array: [] as number[],
  highlightLines: [] as number[],
}];