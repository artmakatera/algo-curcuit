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
  removeWithSingleRightChildToLeftParent,
  removeWithSingleRightChildToRightParent,
  removeWithSingleLeftChildToLeftParent,
  removeWithSingleLeftChildToRightParent,
  removeNode,
  removedSingleNodeWithSingleLeftChild,
  removedSingleNodeWithSingleRightChild,
  removedRootNodeWithSingleLeftChild,
  removedRootNodeWithSingleRightChild,


  insertRootNode,
  insertLeftNode,
  insertRightNode,

}



export enum LANGUAGES_KEYS {
  javascriptInsert = "javascript~~insert",
  javascriptDelete = "javascript~~delete",
  javascriptFind = "javascript~~find",
};