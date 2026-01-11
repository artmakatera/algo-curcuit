import { GenValue } from "../types";
import { STEPS } from "../constants";


export function* twoSumSorted(arr: number[], target: number): GenValue {

  let left = 0;
  let right = arr.length - 1;
  yield {
    type: STEPS.start,
    start: left,
    end: right,
    result: [],
    swapIndexes: [],
  };

  while (left < right) {

    const currentSum = arr[left] + arr[right];

    if (currentSum === target) {
      yield {
        type: STEPS.found,
        start: left,
        end: right,
        result: [left, right],
        swapIndexes: [],

      };
      return [left, right];
    } else if (currentSum < target) {
      left++;
      yield {
        type: STEPS.ifStart,
        start: left,
        end: right,
        result: [],
        swapIndexes: [],

      };
    } else {
      right--;
      yield {
        type: STEPS.ifEnd,
        start: left,
        end: right,
        result: [],
        swapIndexes: []
      };
    }
  }

  yield {
    type: STEPS.notFound,
    start: left,
    end: right,
    result: [],
    swapIndexes: []
  };
  return [];

}
