import { LANGUAGES } from "@/shared/constants/languages";
import { STEPS } from "../../constants";
export const code = `class BinaryTree {
   constructor() {
    this.root = null;
  }

  inOrder() {
    const result = [];
    const stack = [];
    let current = this.root;

    if (!current) {
      return result;
    }

    while (current || stack.length > 0) {
      while (current) {
        stack.push(current);
        current = current.left;
      }
      current = stack.pop();
      result.push(current.value);
      current = current.right;
    }

    return result;
  }
}`;


export const highlightLines: { [key in STEPS]?: number[] } = {
  [STEPS.start]: [6, 26, 7, 8, 9],
  [STEPS.addToStack]: [6, 26, 15, 23, 16, 17, 18, 19],
  [STEPS.popFromStack]: [6, 26, 15, 23, 20, 21, 22],
  [STEPS.endTraverse]: [6, 26, 25],
  [STEPS.earlyEndTraverse]: [6, 26, 11, 12, 13],
};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
}

export default model;