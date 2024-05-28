import { LANGUAGES } from "@/shared/constants/languages";
import { TreeNode } from "./binary-tree";
import { STEPS } from "./constants";
import { GenValuePayload, StepSnapshot, TreeArrayGroups } from "./types";
import { LanguagesMapKeys, languagesInsertMapSettings } from "./languages-map-settings";

export const createStepSnapshot = (payload: GenValuePayload, codeLang: LanguagesMapKeys = LANGUAGES.javascript): StepSnapshot => {
  const { type, treeView, node, insertedNode, nodeToRemove, minValueNode } = payload;
  return {
    type,
    node: node || null,
    treeView,
    insertedNode,
    nodeToRemove,
    minValueNode,

    highlightLines: languagesInsertMapSettings[codeLang]?.highlightLines[type] || [],
  };
};

export const defaultSnapshot = {
  type: STEPS.start,
  node: null as TreeNode | null,
  insertedNode: undefined,
  nodeToRemove: undefined,
  minValueNode: undefined,
  treeView: {} as TreeArrayGroups,
  highlightLines: [],
}

export const defaultSnapshots = [defaultSnapshot]; 