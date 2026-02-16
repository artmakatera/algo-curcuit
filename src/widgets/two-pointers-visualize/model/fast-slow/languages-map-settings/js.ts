import { LANGUAGES, STEPS } from "../../constants";



const code = `function moveZeros(arr) {
  let slow = 0;
  let fast = 0;
  const n = arr.length;

  while (fast < n) {
    if (arr[fast] !== 0) {
        [arr[slow], arr[fast]] = [arr[fast], arr[slow]];

        slow++;
    }

    fast++;
  }

  return arr;
}`


export const highlightLines: { [key in keyof typeof STEPS]?: number[] } = {
  [STEPS.start]: [1, 17, 2, 3, 4],
  [STEPS.check]: [1, 17, 6, 14],
  [STEPS.movePointers]: [1, 17, 6, 14, 7, 11, 8],
  [STEPS.movedPointers]: [1, 17, 6, 14, 7, 11, 8],
  [STEPS.ifStart]: [1, 17, 6, 14, 9, 7, 10, 11],
  [STEPS.ifEnd]: [1, 17, 6, 14 ,13],
  [STEPS.found]: [1, 17, 16],
};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
}

export default model;