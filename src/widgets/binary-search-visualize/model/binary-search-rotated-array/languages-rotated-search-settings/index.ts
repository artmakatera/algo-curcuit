import { LANGUAGES } from "../../constants"

import jsModel from "./js"
import javaModel from "./java"

export const languagesRotatedMapSettings = {
  [LANGUAGES.javascript]: jsModel,
  [LANGUAGES.java]: javaModel,
}

export type LanguagesMapKeys = keyof typeof languagesRotatedMapSettings;
export type LanguagesMapValues = typeof languagesRotatedMapSettings[LanguagesMapKeys];
