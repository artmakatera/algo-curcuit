import { STEPS } from '../constants';


export function* binarySearchRotatedSortedArray(array: number[], target: number) {
  let start = 0;
  let end = array.length - 1;

  yield { type: STEPS.start, start, end };

  while (start <= end) {
    let middleIndex = Math.floor((start + end) / 2);

    yield { type: STEPS.middleIndex, middleIndex, start, end };

    if (array[middleIndex] === target) {
      yield { type: STEPS.result, middleIndex: -1, result: middleIndex };
      return middleIndex;
    }

    if (array[middleIndex] >= array[start]) {
      yield { type: STEPS.ifStart, start, end, middleIndex };
      // is sorted
      if (target >= array[start] && target < array[middleIndex]) {
        end = middleIndex - 1;

        yield { type: STEPS.ifStartSorted, start, end, middleIndex };
      } else {
        start = middleIndex + 1
        yield { type: STEPS.ifStartNotSorted, start, end, middleIndex };
      }
    } else {

      yield { type: STEPS.ifEnd, start, end, middleIndex };

      if (target <= array[end] && target > array[middleIndex]) {
        start = middleIndex + 1;
        yield { type: STEPS.ifEndSorted, start, end, middleIndex };

      } else {
        end = middleIndex - 1;
        yield { type: STEPS.ifEndNotSorted, start, end, middleIndex };
      }
    }
  }

  yield { type: STEPS.notFound, start: -1, end: -1, middleIndex: -1 }

  return -1;
}



