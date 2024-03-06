import { StepSnapshotPayload } from "../types";
import { STEPS } from "../constants";


export function* bubbleSort(arr: number[]): Generator<StepSnapshotPayload, number[], unknown> {

  let sortedIndex = arr.length;
  yield { type: STEPS.start, compareIndexes: [], swapIndexes: [], sortedIndex, array: [...arr] };
  yield { type: STEPS.started, compareIndexes: [], swapIndexes: [], sortedIndex, array: [...arr] };


  while (sortedIndex !== 0) {
    for (let i = 0; i < sortedIndex - 1; i++) {
      yield { type: STEPS.compare, compareIndexes: [i, i + 1], swapIndexes: [], sortedIndex, array: [...arr] };
      if (arr[i] > arr[i + 1]) {
        yield { type: STEPS.swap, compareIndexes: [i, i + 1], swapIndexes: [i, i + 1], sortedIndex, array: [...arr] };
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
      }
    }
    sortedIndex -= 1;
    yield { type: STEPS.sortedIndex, compareIndexes: [], swapIndexes: [], sortedIndex, array: [...arr] };
  }

  yield { type: STEPS.end, compareIndexes: [], swapIndexes: [], sortedIndex, array: [...arr] };

  return arr
}

export default bubbleSort;