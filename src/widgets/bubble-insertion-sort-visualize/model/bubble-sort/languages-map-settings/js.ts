import { LANGUAGES, STEPS } from "../../constants";



const code = `function bubbleSort(arr) {
  let sortedIndex = arr.length;

  while (sortedIndex !== 0) {
    for (let i = 0; i < sortedIndex - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
      }
    }
    sortedIndex -= 1;
  }

  return arr
}`




export const highlightLines: { [key in STEPS]?: number[] } = {
  [STEPS.started]: [2],
  [STEPS.compare]: [4, 5, 9, 11],
  [STEPS.swap]: [4, 5, 6, 7, 8, 9, 11],
  [STEPS.sortedIndex]: [10],
  [STEPS.end]: [13]

};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
}

export default model;