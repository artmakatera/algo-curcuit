import { LANGUAGES } from "@/shared/constants/languages";
import { STEPS } from "../../constants";
export const code = `class BinaryTree {
   constructor() {
    this.root = null;
  }

  dfs() {
        const node = this.root;

        if (!node) {
          return [];
        }

        const stack = [node];
        const result = [];

        while (stack.length > 0) {
          const current = stack.pop();
          result.push(current.value);

          if (current.right) {
            stack.push(current.right);
          }

          if (current.left) {
            stack.push(current.left);
          }
        }

        return result;
  }
}`;


export const highlightLines: { [key in STEPS]?: number[] } = {
  [STEPS.start]: [6, 30, 7],
  [STEPS.addToStack]: [6, 30, 13, 14],
  [STEPS.addLeftToStack]: [6, 30, 16, 27, 24, 25, 26],
  [STEPS.addRightToStack]: [6, 30, 16, 27, 20, 21, 22],
  [STEPS.popFromStack]: [6, 30, 16, 27, 17, 18],
  [STEPS.endTraverse]: [6, 30, 29],
  [STEPS.earlyEndTraverse]: [6, 30, 9, 10, 11],
};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
}

export default model;