import { LANGUAGES } from "@/shared/constants/languages";
import { STEPS } from "../constants";


export const code = ` class BinaryTree {

  constructor() {
    this.root = null;
  }

  insert(value) {
    if (this.root === null) {
      this.root = new TreeNode(value)
      return;
    }
    let node = this.root;
    while (node) {
      if (value < node.value) {
        if (node.left === null) {
          node.left = new TreeNode(value);
          return;
        }
        node = node.left
      } else {
        if (node.right === null) {
          node.right = new TreeNode(value);
          return;
        }
        node = node.right;
      }
    }
  }
}
`;


export const highlightLines: { [key in STEPS]?: number[] } = {
  [STEPS.insertRootNode]: [7, 28, 8, 9, 10, 11],
  [STEPS.insertLeftNode]: [7, 28, 13, 27, 14, 15, 16, 17, 18,],
  [STEPS.insertRightNode]: [7, 28, 13, 27, 20, 21, 22, 23, 24, 26],
  [STEPS.start]: [7, 28, 71],
  [STEPS.checkLeftNode]: [7, 28, 13, 27, 14, 15, 16, 17, 18, 19, 20],
  [STEPS.checkRightNode]: [7, 28, 13, 27, 20, 21, 22, 23, 24, 25, 26],

  [STEPS.foundNode]: [7, 28],
};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
}

export default model;