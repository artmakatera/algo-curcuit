import { LANGUAGES } from "@/shared/constants/languages";
import { STEPS } from "../constants";


export const code = ` class BinaryTree {

  constructor() {
    this.root = null;
  }

   find(value) {
    let currentNode = this.root;

    while (currentNode) {
      if (currentNode.value === value) {
        return currentNode;
      }

      if (value > currentNode.value) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }
    }

    return false;
  }
}
`;


export const highlightLines: { [key in STEPS]?: number[] } = {
  [STEPS.start]: [7, 8, 23],
  [STEPS.checkLeftNode]: [7, 10, 17, 18, 19, 20, 23],
  [STEPS.checkRightNode]: [7, 10, 15, 16, 17, 20, 23,],

  [STEPS.foundNode]: [7, 10, 11, 12, 13, 23],
  [STEPS.notFound]: [7, 20, 22, 23],
};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
}

export default model;