

import { LANGUAGES_KEYS } from "../constants";
import jsInsertModel from "./js-insert"
import jsFindModel from "./js-find"
import jsRemoveModel from "./js-remove"


export const languagesInsertMapSettings = {
  [LANGUAGES_KEYS.javascriptInsert]: jsInsertModel,
  [LANGUAGES_KEYS.javascriptFind]: jsFindModel,
  [LANGUAGES_KEYS.javascriptDelete]: jsRemoveModel,
}

export type LanguagesMapKeys = keyof typeof languagesInsertMapSettings;
export type LanguagesMapValues = typeof languagesInsertMapSettings[LanguagesMapKeys];
