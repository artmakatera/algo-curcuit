

import { LANGUAGES } from "../constants";
import jsInsertModel from "./js/insert"
import jsFindModel from "./js/find"
import jsRemoveModel from "./js/remove";
import javaInsertModel from "./java/insert";
import javaRemoveModel from "./java/remove";
import javaFindModel from "./java/find";



export const languagesMapSettings = {
  insert: {
    [LANGUAGES.javascript]: jsInsertModel,
    [LANGUAGES.java]: javaInsertModel,

  },
  find: {
    [LANGUAGES.javascript]: jsFindModel,
    [LANGUAGES.java]: javaFindModel
  },
  delete: {
    [LANGUAGES.javascript]: jsRemoveModel,
    [LANGUAGES.java]: javaRemoveModel
  }
}

