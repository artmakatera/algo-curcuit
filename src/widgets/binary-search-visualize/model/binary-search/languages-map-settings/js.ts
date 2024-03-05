import { STEPS, LANGUAGES } from "../../constants";

export const code = `const binarySearch =(arr, target) => {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let middleIndex = Math.floor((start + end) / 2);

    if (arr[middleIndex] === target) {
      return middleIndex;
    }

    if (arr[middleIndex] < target) {
      start = middleIndex + 1;
    } else {
      end = middleIndex - 1;
    }
  }
  return -1;
};
`;


export const highlightLines: { [key in STEPS]?: number[] } = {
  [STEPS.started]: [2, 3],
  [STEPS.middleIndex]: [5, 17, 6],
  [STEPS.ifStart]: [5, 17, 12, 13, 14],
  [STEPS.ifEnd]: [5, 17, 14, 15, 16],
  [STEPS.result]: [8, 9, 10],
  [STEPS.notFound]: [18]
};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
}

export default model;