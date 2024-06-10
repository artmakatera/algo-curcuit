import { LANGUAGES } from "@/shared/constants/languages";
import { STEPS } from "../constants";


export const code = ` class BinaryTree {
  ...
  remove(value: number, root = this.root) {
    if (root === null) {
      return root;
    }

    if (value < root.value) {
      root.left = this.remove(value, root.left);
      return root;
    }

    if (value > root.value) {
      root.right = this.remove(value, root.right);
      return root;
    }

    if (root.right === null) {
      return root.left;
    }

    if (root.left === null) {
      return root.right;
    }

    let currentNode = root.right;
    let minValue = currentNode.value;

    while (currentNode) {
      minValue = currentNode.value;
      currentNode = currentNode.left;
    }

    root.value = minValue;
    root.right = this.remove(minValue, root.right)

    return root;
  }
}
`;


export const highlightLines: { [key in STEPS]?: number[] } = {
  [STEPS.start]: [3, 38],
  [STEPS.notFound]: [3, 38, 4, 5, 6],
  [STEPS.checkLeftNode]: [3, 38, 8, 9, 10, 11],
  [STEPS.checkRightNode]: [3, 38, 13, 14, 15, 16],
  [STEPS.highlightToRemoveWithoutRightChild]: [3, 38, 18, 19, 20],
  [STEPS.highlightToRemoveWithoutLeftChild]: [3, 38, 22, 23, 24],
  [STEPS.firstCheckMinValue]: [3, 38, 26, 27],
  [STEPS.checkMinValue]: [3, 38, 26, 27, 28, 29, 30, 31, 32],
  [STEPS.foundMinValue]: [3, 38, 33, 34, 35, 36, 37],


  [STEPS.removedNode]: [],


};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
}

export default model;