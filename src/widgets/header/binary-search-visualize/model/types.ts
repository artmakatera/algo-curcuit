import { STEPS} from "./constants"


export type GenValuePayload = {
  type: STEPS;
  start?: number;
  end?: number;
  middleIndex?: number;
  result?: number;
};

export type GenValue = Generator<GenValuePayload, void, number>;



export type StepSnapshot = {
  type: STEPS,
  result?: number,
  compareIndexes: number[],
  checkIndex: number,
  highlightLines: number[]
};