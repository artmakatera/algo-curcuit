import { STEPS } from "../constants";


export function* binarySearch(arr: number[], target: number) {
  let start = 0;
  let end = arr.length - 1;

  yield { type: STEPS.start, start, end };

  while (start <= end) {
    let middleIndex = Math.floor((start + end) / 2);

    yield { type: STEPS.middleIndex, middleIndex, start, end };
    if (arr[middleIndex] === target) {
      yield { type: STEPS.result, middleIndex: -1, result: middleIndex };

      return middleIndex;
    }

    if (arr[middleIndex] < target) {
      yield { type: STEPS.ifStart, start, end, middleIndex };
      start = middleIndex + 1;
    } else {
      yield { type: STEPS.ifEnd, start, end, middleIndex };
      end = middleIndex - 1;
    }
  }

  yield { type: STEPS.notFound, start: -1, end: -1, middleIndex: -1 }
  return -1;
}
