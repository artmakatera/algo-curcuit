import { LANGUAGES } from "@/shared/constants/languages";
import { STEPS } from "../../constants";
export const code = `class BinaryTree {
   constructor() {
    this.root = null;
  }

  postOrder() {
    const node = this.root;

    if (node === null) {
      return [];
    }

    let currentNode = node;
    let previousNode: TreeNode | null = null;
    const result = [];
    const stack = [];

    while (currentNode || stack.length > 0) {
        if (currentNode) {
            stack.push(currentNode);
            currentNode = currentNode.left;
            continue;
        }

        const peekNode = stack[stack.length - 1]

        if (peekNode.right && peekNode.right !== previousNode) {
            currentNode = peekNode.right; 
        } else {
            result.push(stack.pop().val)
            previousNode = peekNode;
        }
    }

    return result;
  }
}`;


export const highlightLines: { [key in STEPS]?: number[] } = {
  [STEPS.start]: [6, 36, 13, 14, 15, 16],
  [STEPS.addToStack]: [6, 36, 18, 33,  19, 20, 21, 22, 23],
  [STEPS.addRightToStack]: [6, 36, 18, 33, 27, 28,29],
  [STEPS.popFromStack]: [6, 36, 18, 33, 29, 30, 31, 32],
  [STEPS.endTraverse]: [6, 36, 25],
  [STEPS.earlyEndTraverse]: [6, 36, 9, 10, 11],
};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
}

export default model;