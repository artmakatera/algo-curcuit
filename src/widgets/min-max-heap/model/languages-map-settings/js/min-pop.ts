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
  [STEPS.startTraverse]: [9, 10, 11],
  [STEPS.peekValue]: [11],
  [STEPS.popValue]: [11, 27],
  [STEPS.moveLastToTop]: [12, 13],
  [STEPS.movedLastToTop]: [13],
  [STEPS.compareNodes]: [17, 18, 19, 20],
  [STEPS.compareLeft]: [21],
  [STEPS.compareRight]: [22],
  [STEPS.swap]: [23, 24],
  [STEPS.swapped]: [25],
  [STEPS.endTraverse]: [23, 27],
};

const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
};

export default model;
