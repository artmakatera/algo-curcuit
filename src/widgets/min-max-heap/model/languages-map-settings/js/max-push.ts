import { LANGUAGES } from "@/shared/constants/languages";
import { STEPS } from "../../constants";

export const code = `class MaxHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);

    let i = this.heap.length - 1;
    let parent = Math.floor((i - 1) / 2);

    while (i > 0 && this.heap[i] > this.heap[parent]) {
      [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
      i = parent;
    }
  }
}
`;

export const highlightLines: { [key: string]: number[] } = {
  [STEPS.startTraverse]: [6, 16],
  [STEPS.pushValue]: [6, 16, 7, 9, 10],
  [STEPS.compareNodes]: [6, 16, 12, 15],
  [STEPS.swap]: [6, 16, 12, 15, 13],
  [STEPS.swapped]: [6, 16, 12, 15, 14],
  [STEPS.endTraverse]: [6, 16],
};

const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
};

export default model;
