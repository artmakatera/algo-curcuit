import { LANGUAGES } from "./constants";
import { LanguagesMapKeys, languagesMapSettings } from "./languages-map-settings";
import { GenValuePayload, StepSnapshot } from "./types";


export const createStepSnapshot = (payload: GenValuePayload, codeLang: LanguagesMapKeys = LANGUAGES.javascript ): StepSnapshot => {
  const { type, result, start, end, middleIndex } = payload;
  return {
    type,
    result,
    compareIndexes: [start ?? -1, end ?? -1],
    checkIndex: middleIndex ?? -1,
    highlightLines: languagesMapSettings[codeLang]?.highlightLines[type],
  };
};