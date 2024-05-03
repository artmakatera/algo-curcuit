import { TreeNode } from "./binary-tree";
import { STEPS } from "./constants";
import { GenValuePayload, StepSnapshot, TreeArrayGroups } from "./types";

export const createStepSnapshot = (payload: GenValuePayload): StepSnapshot => {
  const { type, treeView, node } = payload;
  return {
    type,
    node,
    treeView,


    highlightLines: [],
  };
};

export const defaultSnapshot = {
  type: STEPS.start,
  node: null as TreeNode | null,
  treeView: {} as TreeArrayGroups,
  highlightLines: [],
}

export const defaultSnapshots = [defaultSnapshot]; 