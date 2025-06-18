

import { LANGUAGES } from "../constants";
import { ActionType } from "../types";
import jsInsertModel from "./js/insert"
import jsFindModel from "./js/find"
import jsRemoveModel from "./js/remove";
import jsTraverse from "./js/traverse";
import jsTraverseDfs from "./js/traverse-dfs";
import jsTraverseInOrder from "./js/traverse-inorder";

import javaInsertModel from "./java/insert";
import javaRemoveModel from "./java/remove";
import javaFindModel from "./java/find";
import javaTraverse from "./java/traverse";
import javaTraverseDfs from "./java/traverse-dfs";
import javaTraverseInOrder from "./java/traverse-inorder";


export const languagesMapSettings = {
  [ActionType.insert]: {
    [LANGUAGES.javascript]: jsInsertModel,
    [LANGUAGES.java]: javaInsertModel,

  },
  [ActionType.find]: {
    [LANGUAGES.javascript]: jsFindModel,
    [LANGUAGES.java]: javaFindModel
  },
  [ActionType.delete]: {
    [LANGUAGES.javascript]: jsRemoveModel,
    [LANGUAGES.java]: javaRemoveModel
  },
  [ActionType.bfs]: {
    [LANGUAGES.javascript]: jsTraverse,
    [LANGUAGES.java]: javaTraverse
  },
  [ActionType.dfs]: {
    [LANGUAGES.javascript]: jsTraverseDfs,
    [LANGUAGES.java]: javaTraverseDfs
  },
  [ActionType.inOrder]: {
    [LANGUAGES.javascript]: jsTraverseInOrder,
    [LANGUAGES.java]: javaTraverseInOrder
  }
}

