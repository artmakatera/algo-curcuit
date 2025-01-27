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
  addLeftToQueue,
  addRightToQueue,
  popFromQueue,
  addToResult,
  endTraverse,
  earlyEndTraverse,


}



export enum LANGUAGES {
  javascript = "javascript",
  java = "java",

};