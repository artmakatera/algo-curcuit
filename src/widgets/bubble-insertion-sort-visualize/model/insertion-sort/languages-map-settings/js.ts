import { LANGUAGES, STEPS } from "../../constants";



const code = `function insertionSort(array) {
    for (let i = 1; i < array.length; i++) {

       for (let j = i; j > 0 && array[j] < array[j-1]; j--) {
          [array[j], array[j-1]] = [array[j -1], array[j]];
       }

    }

    return array
}`




export const highlightLines: { [key in STEPS]?: number[] } = {
  [STEPS.started]: [2, 8],
  [STEPS.compare]: [4, 6],
  [STEPS.swap]: [4, 5, 6],
  [STEPS.sortedIndex]: [10],
  [STEPS.end]: [10]

};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
}

export default model;