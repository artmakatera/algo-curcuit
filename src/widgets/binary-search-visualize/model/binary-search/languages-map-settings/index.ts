import { LANGUAGES } from "../../constants"

import jsModel from "./js"
import javaModel from "./java"


export const languagesBSMapSettings = {
  [LANGUAGES.javascript]: jsModel,
  [LANGUAGES.java]: javaModel,
}

export type LanguagesMapKeys = keyof typeof languagesBSMapSettings;
export type LanguagesMapValues = typeof languagesBSMapSettings[LanguagesMapKeys];
