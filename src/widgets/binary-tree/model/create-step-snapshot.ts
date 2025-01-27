import { TreeNode } from "./binary-tree";
import { STEPS } from "./constants";
import { GenValuePayload, StepSnapshot, TreeArrayGroups } from "./types";

export const createStepSnapshot = (payload: GenValuePayload,): StepSnapshot => {
  const { type, treeView, node, insertedNode, nodeToRemove, minValueNode, queue, result } = payload;


  return {
    type,
    node: node || null,
    treeView,
    insertedNode,
    nodeToRemove,
    minValueNode,
    queue, result

  };
};



export const defaultSnapshot = {
  type: STEPS.start,
  node: null as TreeNode | null,
  insertedNode: undefined,
  nodeToRemove: undefined,
  minValueNode: undefined,
  queue: undefined,
  result: undefined,
  treeView: {} as TreeArrayGroups,
}

export const defaultSnapshots = [defaultSnapshot]; 