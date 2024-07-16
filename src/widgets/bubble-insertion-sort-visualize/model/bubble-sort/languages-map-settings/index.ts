import { LANGUAGES } from "../../constants"

import jsModel from "./js"
import javaModel from "./java"


export const languagesMapSettings = {
  [LANGUAGES.javascript]: jsModel,
  [LANGUAGES.java]: javaModel,
}

export type LanguagesMapKeys = keyof typeof languagesMapSettings;
export type LanguagesMapValues = typeof languagesMapSettings[LanguagesMapKeys];
