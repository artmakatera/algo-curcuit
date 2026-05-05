import { LANGUAGES } from "@/shared/constants/languages";
import { STEPS } from "../../constants";

export const code = `class MinHeap {
  constructor() {
    this.heap = [];
  }

  pop() {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    if (this.heap.length === 1) return this.heap.pop();
    this.heap[0] = this.heap.pop();

    let i = 0;
    const n = this.heap.length;
    while (true) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let smallest = i;
      if (left < n && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < n && this.heap[right] < this.heap[smallest]) smallest = right;
      if (smallest === i) break;
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
    return min;
  }
}
`;

export const highlightLines: { [key: string]: number[] } = {
  [STEPS.earlyReturn]: [6, 25, 7],
  [STEPS.startTraverse]: [6, 25, 8],
  [STEPS.popValue]: [6, 25, 10],
  [STEPS.moveLastToTop]: [6, 25, 10],
  [STEPS.movedLastToTop]: [6, 25, 12, 13],
  [STEPS.compareNodes]: [6, 25, 14, 23, 15, 16, 17],
  [STEPS.compareLeft]: [6, 25, 14, 23, 18],
  [STEPS.compareRight]: [6, 25, 14, 23, 19],
  [STEPS.endSwapping]: [6, 25, 14, 23, 20],
  [STEPS.swap]: [6, 25, 14, 23, 21],
  [STEPS.swapped]: [6, 25, 14, 23, 22],
  [STEPS.endTraverse]: [6, 25, 14, 23, 24],
};

const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
};

export default model;
