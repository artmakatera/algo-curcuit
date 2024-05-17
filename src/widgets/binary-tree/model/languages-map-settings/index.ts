

import { LANGUAGES } from "@/shared/constants/languages";
import jsModel from "./js"


export const languagesInsertMapSettings = {
  [LANGUAGES.javascript]: jsModel,
}

export type LanguagesMapKeys = keyof typeof languagesInsertMapSettings;
export type LanguagesMapValues = typeof languagesInsertMapSettings[LanguagesMapKeys];
