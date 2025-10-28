import { GenValue } from "../types";
import { STEPS } from "../constants";


export function* twoSumSorted(arr: number[], target: number): GenValue {

  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    yield {
      type: STEPS.check,
      start: left,
      end: right,

    };

    const currentSum = arr[left] + arr[right];

    if (currentSum === target) {
      yield {
        type: STEPS.found,
        start: left,
        end: right,
        result: [left, right],
      };
      return [left, right];
    } else if (currentSum < target) {
      left++;
    } else {
      right--;
    }
  }

  yield {
    type: STEPS.notFound
  };

  return [];

}
