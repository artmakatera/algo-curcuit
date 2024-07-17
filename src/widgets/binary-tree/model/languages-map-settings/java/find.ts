import { LANGUAGES } from "@/shared/constants/languages";
import { STEPS } from "../../constants";


export const code = ` class BinaryTree {
  ...
   Node find(int value) {
    Node currentNode = root;

    while (currentNode) {
      if (currentNode.value == value) {
        return currentNode;
      }

      if (value > currentNode.value) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }
    }

    return null;
  }
}
`;


export const highlightLines: { [key in STEPS]?: number[] } = {
  [STEPS.start]: [3, 19, 4,],
  [STEPS.checkLeftNode]: [3, 19, 6, 13, 14, 15, 16],
  [STEPS.checkRightNode]: [3, 19, 6, 11, 12, 13, 16],

  [STEPS.foundNode]: [3, 19, 6, 7, 8, 9, 16],
  [STEPS.notFound]: [3, 19, 6, 16, 18],
};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
}

export default model;