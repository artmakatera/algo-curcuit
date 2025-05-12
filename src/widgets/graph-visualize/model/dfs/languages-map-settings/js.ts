import { LANGUAGES, STEPS } from "../../constants";



const code = `function insertionSort(array) {
    for (let i = 1; i < array.length; i++) {

       for (let j = i; j > 0 && array[j] < array[j-1]; j--) {
          [array[j], array[j-1]] = [array[j -1], array[j]];
       }

    }

    return array
}`




export const highlightLines: { [key in keyof typeof STEPS]?: number[] } = {
  [STEPS.start]: [2, 8],
 [STEPS.addStartNode]: [3, 7],
  [STEPS.removeFromStack]: [4, 6],
  [STEPS.addToResult]: [5, 6],
  [STEPS.checkIfVisited]: [4, 5],
  [STEPS.addToStack]: [4, 5],
  [STEPS.end]: [8]
};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
}

export default model;