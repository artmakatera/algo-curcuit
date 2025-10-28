import { LANGUAGES, STEPS } from "../../constants";



const code = `function twoSumSorted(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    if (arr[left] + arr[right] === target) {
      return [left, right];
    }

    if (arr[left] + arr[right] < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];  
}`




export const highlightLines: { [key in keyof typeof STEPS]?: number[] } = {
  [STEPS.start]: [1, 18, 2, 3],
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