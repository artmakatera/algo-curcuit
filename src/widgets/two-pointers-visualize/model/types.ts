import { BaseSnapshot } from "@/shared/types/snapshot";
import { STEPS } from "./constants"
export type GenValuePayload = {
  type: Partial<typeof STEPS[keyof typeof STEPS]>;
  start?: number;
  end?: number;
  result: number[];
  swapIndexes: number[];
};

export type GenValue = Generator<GenValuePayload, number[], number>;



export interface StepSnapshot extends BaseSnapshot {
  type: Partial<typeof STEPS[keyof typeof STEPS]>,
  result: number[],
  compareIndexes: number[],
  swapIndexes: number[],
  
};