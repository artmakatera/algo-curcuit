import { StepSnapshotPayload } from "../types";
import { STEPS } from "../constants";


export function* insertionSort(arr: number[]): Generator<StepSnapshotPayload, number[], unknown> {
  yield { type: STEPS.start, compareIndexes: [], swapIndexes: [], array: [...arr] };
  yield { type: STEPS.started, compareIndexes: [], swapIndexes: [], array: [...arr] };


  for (let i = 1; i < arr.length; i++) {

    for (let j = i; j > 0; j--) {
      yield { type: STEPS.compare, compareIndexes: [j, j - 1], swapIndexes: [], array: [...arr] };
      if (arr[j] < arr[j - 1]) {
        yield { type: STEPS.swap, compareIndexes: [], swapIndexes: [j - 1, j], array: [...arr] };
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];

      } else {
        break;
      }
    }

  }

  yield { type: STEPS.end, compareIndexes: [], swapIndexes: [], sortedIndex: arr.length - 1, array: [...arr] };

  return arr;
}