import { TreeNode } from "./binary-tree";
import { LANGUAGES_KEYS, STEPS } from "./constants";
import { GenValuePayload, StepSnapshot, TreeArrayGroups } from "./types";
import { LanguagesMapKeys, languagesInsertMapSettings } from "./languages-map-settings";

const createStepSnapshotWithPrevHighlight = () => {
  let prevHighlight: number[] = [];

  return (codeLang: LanguagesMapKeys = LANGUAGES_KEYS.javascriptInsert, payload: GenValuePayload,): StepSnapshot => {
    const { type, treeView, node, insertedNode, nodeToRemove, minValueNode } = payload;
    if (type === STEPS.start) {
      prevHighlight = [];
    }

    let highlightLines = languagesInsertMapSettings[codeLang]?.highlightLines[type] || null;

    if (highlightLines) {
      prevHighlight = highlightLines;
    }

    return {
      type,
      node: node || null,
      treeView,
      insertedNode,
      nodeToRemove,
      minValueNode,

      highlightLines: highlightLines || prevHighlight,
    };
  };
}

export const createStepSnapshot = createStepSnapshotWithPrevHighlight();

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