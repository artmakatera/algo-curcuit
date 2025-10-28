import { LANGUAGES, STEPS } from "../../constants";



const code = `function twoSumSorted(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    if (arr[left] + arr[right] === target) {
      return [left, right];
    } else if (arr[left] + arr[right] < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];  
}`




export const highlightLines: { [key in keyof typeof STEPS]?: number[] } = {
  [STEPS.start]: [1, 22],

};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
}

export default model;