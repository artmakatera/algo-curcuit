import { BaseSnapshot } from "@/shared/types/snapshot";
import { STEPS } from "./constants"


export type GenValuePayload = {
  type: Partial<STEPS>;
  start?: number;
  end?: number;
  middleIndex?: number;
  result?: number;
};

export type GenValue = Generator<GenValuePayload, void, number>;



export interface StepSnapshot extends BaseSnapshot {
  type: Partial<STEPS>,
  result?: number,
  compareIndexes: number[],
  checkIndex: number,
};