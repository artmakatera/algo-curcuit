
import { STEPS } from "./constants"

export const getIsRemoveSingleChild = (type: STEPS) => [
  STEPS.removeSingleChild,
].includes(type)


export const getPreventNodeEdgeAnimation = (type: STEPS) => [
  STEPS.removedNode,
].includes(type)
