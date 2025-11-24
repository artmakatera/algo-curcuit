import { GenValue } from "../types";
import { STEPS } from "../constants";


export function* moveZeros(arr: number[]): GenValue {
  let slow = 0;
  let fast = 0;
  const n = arr.length;

  yield { type: STEPS.start, start: -1, end: -1, result: [...arr] };

  while (fast < n) {
    yield { type: STEPS.check, start: slow, end: fast, result: [...arr] };


    [arr[slow], arr[fast]] = [arr[fast], arr[slow]];
    yield { type: STEPS.movePointers, start: slow, end: fast, swapIndexes: [slow, fast], result: [...arr] };

    if (arr[slow] !== 0) {
      slow++;
      yield { type: STEPS.ifStart, start: slow, end: fast, result: [...arr] };
    }

    fast++;
    yield { type: STEPS.ifEnd, start: slow, end: fast, result: [...arr] };
  }

  yield { type: STEPS.found, start: -1, end: -1, result: [...arr] };



  return arr;


}
