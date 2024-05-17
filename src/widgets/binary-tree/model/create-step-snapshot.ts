import { LANGUAGES } from "@/shared/constants/languages";
import { TreeNode } from "./binary-tree";
import { STEPS } from "./constants";
import { GenValuePayload, StepSnapshot, TreeArrayGroups } from "./types";
import { LanguagesMapKeys, languagesInsertMapSettings } from "./languages-map-settings";

export const createStepSnapshot = (payload: GenValuePayload, codeLang: LanguagesMapKeys = LANGUAGES.javascript): StepSnapshot => {
  const { type, treeView, node, insertedNode } = payload;
  return {
    type,
    node,
    treeView,
    insertedNode,


    highlightLines: languagesInsertMapSettings[codeLang]?.highlightLines[type] || [],
  };
};

export const defaultSnapshot = {
  type: STEPS.start,
  node: null as TreeNode | null,
  insertedNode: undefined,
  treeView: {} as TreeArrayGroups,
  highlightLines: [],
}

export const defaultSnapshots = [defaultSnapshot]; 