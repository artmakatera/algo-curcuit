import { LANGUAGES, STEPS } from "../..";

export const code = `const binarySearchSortedArray = (array: number[], target: number): number => {
  let start = 0;
  let end = array.length - 1;

  while (start <= end) {
    let middleIndex = Math.floor((start + end) / 2);

    if (array[middleIndex] === target) {
      return middleIndex;
    }

    if (array[middleIndex] >= array[start]) {

      if (target >= array[start] && target < array[middleIndex]) {
        end = middleIndex - 1;
      } else {
        start = middleIndex + 1
      }

    } else {

      if (target <= array[end] && target > array[middleIndex]) {
        start = middleIndex + 1;
      } else {
        end = middleIndex - 1;
      }

    }
  }

  return -1;
}
`;


export const highlightLines: { [key in STEPS]?: number[] } = {
  [STEPS.started]: [2, 3],
  [STEPS.middleIndex]: [5, 29, 6],
  [STEPS.ifStart]: [5, 29, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  [STEPS.ifEnd]: [5, 29, 20, 21, 22, 23, 24, 25, 26, 27, 28],
  [STEPS.ifStartSorted]: [12, 13, 14, 15, 16, 17, 18, 19, 20],
  [STEPS.ifStartNotSorted]: [17, 18, 19, 20],
  [STEPS.ifEndSorted]: [20, 21, 22, 23, 24, 27, 28],
  [STEPS.ifEndNotSorted]: [5, 29, 24, 25, 26, 27, 28],
  [STEPS.result]: [8, 9, 10],
  [STEPS.notFound]: [31]
};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
}

export default model;