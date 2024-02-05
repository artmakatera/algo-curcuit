import { LANGUAGES } from "../constants"

import jsModel from "./js"


export const languagesMapSettings = {
  [LANGUAGES.javascript]: jsModel,
}

export type LanguagesMapKeys = keyof typeof languagesMapSettings;
export type LanguagesMapValues = typeof languagesMapSettings[LanguagesMapKeys];
