import { LANGUAGES, STEPS } from "../../constants";



const code = `function moveZeros(arr) {
  let slow = 0;
  let fast = 0;
  const n = arr.length;

  while (fast < n) {
    [arr[slow], arr[fast]] = [arr[fast], arr[slow]];

    if (arr[fast] !== 0) {
      slow++;
    }

    fast++;
  }

  return arr;
`


export const highlightLines: { [key in keyof typeof STEPS]?: number[] } = {
  [STEPS.start]: [],
  [STEPS.ifStart]: [1, 18, 5, 15, 10, 11, 12],
  [STEPS.ifEnd]: [1, 18, 5, 15, 12, 13, 14],
  [STEPS.found]: [1, 18, 6, 7, 8],
  [STEPS.notFound]: [1, 18, 17],
};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
}

export default model;