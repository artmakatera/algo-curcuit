import { LANGUAGES } from "@/shared/constants/languages";
import { STEPS } from "../../constants";


export const code = `class BinaryTree {
  constructor() {
    this.root = null;
  }

  bfs() {
        const node = this.root;

        if (!node) {
          return [];
        }

        let queue = [node];
        let result = [];

        while (queue.length > 0) {
          let currentNode = queue.shift()!;

          result.push(currentNode);

          if (currentNode.left) {
            queue.push(currentNode.left);
          }
    
          if (currentNode.right) {
            queue.push(currentNode.right);
          }
        }

        return result;
  }
}`;


export const highlightLines: { [key in STEPS]?: number[] } = {
  [STEPS.start]: [6, 31, 7],
  [STEPS.addToQueue]: [6, 31, 13, 14],
  [STEPS.addLeftToQueue]: [6, 31, 16, 28, 21, 22, 23],
  [STEPS.addRightToQueue]: [6, 31, 16, 28, 25, 26, 27],
  [STEPS.popFromQueue]: [6, 31, 16, 28, 17],
  [STEPS.addToResult]: [6, 31, 16, 28, 19],
  [STEPS.endTraverse]: [6, 31, 30],
  [STEPS.earlyEndTraverse]: [6, 31, 9, 10, 11],

};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
}

export default model;