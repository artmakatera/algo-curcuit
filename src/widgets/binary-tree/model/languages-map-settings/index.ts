

import { LANGUAGES } from "../constants";
import jsInsertModel from "./js/insert"
import jsFindModel from "./js/find"
import jsRemoveModel from "./js/remove";
import jsTraverse from "./js/traverse";

import javaInsertModel from "./java/insert";
import javaRemoveModel from "./java/remove";
import javaFindModel from "./java/find";
import javaTraverse from "./java/traverse";



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
  },
  traverse: {
    [LANGUAGES.javascript]: jsTraverse,
    [LANGUAGES.java]: javaTraverse
  },
  bfs: {
    [LANGUAGES.javascript]: jsTraverse,
    [LANGUAGES.java]: javaTraverse
  }
}

