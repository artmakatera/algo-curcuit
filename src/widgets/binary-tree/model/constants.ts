export enum STEPS {
  start,
  checkNode,
  checkLeftNode,
  checkRightNode,
  foundNode,
  notFound,

  highlightToRemove,
  removedNode,
  firstCheckMinValue,
  checkMinValue,
  foundMinValue,
  minValueFirstRightChild,
  removeSingleChild,
  removeNode,

  checkNodeWithoutLeftChild,
  highlightToRemoveWithoutLeftChild,
  highlightToRemoveWithoutRightChild,


  insertRootNode,
  insertLeftNode,
  insertRightNode,

  addToQueue,
  popFromQueue,
  addToResult,
  endTraverse,


}



export enum LANGUAGES {
  javascript = "javascript",
  java = "java",

};