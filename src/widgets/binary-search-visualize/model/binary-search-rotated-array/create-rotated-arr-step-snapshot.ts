import { LANGUAGES } from "../constants";
import { LanguagesMapKeys, languagesRotatedMapSettings } from "./languages-rotated-search-settings";
import { GenValuePayload, StepSnapshot } from "../types";


export const createRotatedBSStepSnapshot = (payload: GenValuePayload, codeLang: LanguagesMapKeys = LANGUAGES.javascript): StepSnapshot => {
  const { type, result, start, end, middleIndex } = payload;
  return {
    type,
    result,
    compareIndexes: [start ?? -1, end ?? -1],
    checkIndex: middleIndex ?? -1,
    highlightLines: languagesRotatedMapSettings[codeLang]?.highlightLines[type] || [],
  };
};