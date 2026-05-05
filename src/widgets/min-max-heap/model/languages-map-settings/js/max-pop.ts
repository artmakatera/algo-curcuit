import { LANGUAGES } from "@/shared/constants/languages";
import { STEPS } from "../../constants";

export const code = `class MaxHeap {
  constructor() {
    this.heap = [];
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const max = this.heap[0];
    this.heap[0] = this.heap.pop();

    let i = 0;
    const n = this.heap.length;
    while (true) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let largest = i;
      if (left < n && this.heap[left] > this.heap[largest]) largest = left;
      if (right < n && this.heap[right] > this.heap[largest]) largest = right;
      if (largest === i) break;
      [this.heap[i], this.heap[largest]] = [this.heap[largest], this.heap[i]];
      i = largest;
    }
    return max;
  }
}
`;

export const highlightLines: { [key: string]: number[] } = {
  [STEPS.startTraverse]: [6, 25],
  [STEPS.earlyReturn]: [6, 25, 7],
  [STEPS.earlyPop]: [6, 25, 8],
  [STEPS.popValue]: [6, 25, 9, 10],
  [STEPS.moveLastToTop]: [6, 25, 9, 10],
  [STEPS.movedLastToTop]: [6, 25, 12, 13],
  [STEPS.compareNodes]: [6, 25, 14, 23, 15, 16, 17],
  [STEPS.compareLeft]: [6, 25, 14, 23, 18],
  [STEPS.compareRight]: [6, 25, 14, 23, 19],
  [STEPS.endSwapping]: [6, 25, 14, 23, 20],
  [STEPS.swap]: [6, 25, 14, 23, 21],
  [STEPS.swapped]: [6, 25, 14, 23, 22],
  [STEPS.endTraverse]: [6, 25, 24],
};

const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
};

export default model;
