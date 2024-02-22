import { LANGUAGES } from "../../constants"

import jsModel from "./js"


export const languagesBSMapSettings = {
  [LANGUAGES.javascript]: jsModel,
}

export type LanguagesMapKeys = keyof typeof languagesBSMapSettings;
export type LanguagesMapValues = typeof languagesBSMapSettings[LanguagesMapKeys];
