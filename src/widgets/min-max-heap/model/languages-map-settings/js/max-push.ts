import { LANGUAGES } from "@/shared/constants/languages";
import { STEPS } from "../../constants";

export const code = `class MaxHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    let i = this.heap.length - 1;

    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[i] > this.heap[parent]) {
        [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
        i = parent;
      } else {
        break;
      }
    }
  }
}
`;

export const highlightLines: { [key: string]: number[] } = {
  [STEPS.startTraverse]: [6, 9],
  [STEPS.pushValue]: [9, 10],
  [STEPS.compareNodes]: [12, 13, 14],
  [STEPS.swap]: [14, 15],
  [STEPS.swapped]: [16],
  [STEPS.endTraverse]: [17, 18, 19, 20],
};

const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
};

export default model;
