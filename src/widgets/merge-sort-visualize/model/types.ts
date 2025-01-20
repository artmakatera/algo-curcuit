import { BaseSnapshot } from "@/shared/types/snapshot";
import { STEPS } from "./constants";





export interface StepSnapshot extends BaseSnapshot {
  type: STEPS,
  firstArray:  number[] | number[][];
  secondArray: null | number[][];
  indexOfSourceSubArray: number;
  indexOfTargetSubArray: number;
  subArraysIndexesToMerge?: [number, number];
  moveIndex: number;
  targetIndex: number; 
  sourceIndexesToMerge: number[];
};


export type GenValue = Generator<StepSnapshot, void, number>;
