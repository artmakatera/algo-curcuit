import { LANGUAGES } from "@/shared/constants/languages";
import { STEPS } from "../../constants";

export const code = `class MaxHeap {
  constructor() {
    this.heap = [];
  }

  peek() {
    return this.heap[0];
  }
}
`;

export const highlightLines: { [key: string]: number[] } = {
  [STEPS.peekValue]: [6, 7, 8],
};

const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
};

export default model;
