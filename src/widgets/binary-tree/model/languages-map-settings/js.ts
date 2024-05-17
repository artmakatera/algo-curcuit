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
  [STEPS.insertNode]: [7, 28, 8, 9, 10, 11],
  [STEPS.start]: [7, 28, 71],
  [STEPS.checkNode]: [7, 28],
  [STEPS.foundNode]: [7, 28],
};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
}

export default model;