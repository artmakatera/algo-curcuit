
import { STEPS } from "./constants"

export const getIsRemoveSingleChild = (type: STEPS) => [
  STEPS.removeWithSingleRightChildToLeftParent,
  STEPS.removeWithSingleRightChildToRightParent,
  STEPS.removeWithSingleLeftChildToLeftParent,
  STEPS.removeWithSingleLeftChildToRightParent,
].includes(type)


export const getPreventNodeEdgeAnimation = (type: STEPS) => [
  STEPS.removedNode,
  STEPS.removedSingleNodeWithSingleLeftChild,
  STEPS.removedSingleNodeWithSingleRightChild,
  STEPS.removedRootNodeWithSingleLeftChild,
  STEPS.removedRootNodeWithSingleRightChild,
].includes(type)
