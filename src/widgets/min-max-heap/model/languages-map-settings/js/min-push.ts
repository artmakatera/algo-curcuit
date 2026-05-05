import { LANGUAGES } from "@/shared/constants/languages";
import { STEPS } from "../../constants";

export const code = `class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    let i = this.heap.length - 1;
    let parent = Math.floor((i - 1) / 2);
    while (i > 0 && this.heap[i] < this.heap[parent]) {
      [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
      i = parent;
    }
  }
}
`;

export const highlightLines: { [key: string]: number[] } = {
  [STEPS.startTraverse]: [6, 14],
  [STEPS.pushValue]: [6, 14, 7, 8, 9],
  [STEPS.compareNodes]: [6, 14, 10, 13],
  [STEPS.swap]: [6, 14, 11],
  [STEPS.swapped]: [6, 14, 12],
  [STEPS.endTraverse]: [6, 14],
};

const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
};

export default model;
