import { LANGUAGES } from "../../constants"

import jsModel from "./js"


export const languagesRotatedMapSettings = {
  [LANGUAGES.javascript]: jsModel,
}

export type LanguagesMapKeys = keyof typeof languagesRotatedMapSettings;
export type LanguagesMapValues = typeof languagesRotatedMapSettings[LanguagesMapKeys];
