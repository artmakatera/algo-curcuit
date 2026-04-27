import { BaseSnapshot } from "@/shared/types/snapshot";
import { STEPS } from "./constants";
import { TreeNode } from "@/widgets/binary-tree/model/binary-tree";

export enum ActionType {
  push = "push",
  pop = "pop",
  peek = "peek",
}

export type DispatchPayload = {
  type: ActionType;
  value: number | null;
  canClose?: boolean;
};

export type Dispatch = (d: DispatchPayload) => void;

export type GenValuePayload = {
  type: string;
  value: number;
  index: number;
  compareIndexes: number[];
  swapIndexes: number[];
  removeIndex: number;
  heap: number[];
  node: TreeNode | null;
};

export type GenValue = Generator<GenValuePayload, void, unknown>;

export type GenCall = (heap: number[], value: number) => GenValue;

export interface StepSnapshot extends BaseSnapshot {
  type: string;
  value: number;
  index: number;
  compareIndexes: number[];
  swapIndexes: number[];
  removeIndex: number;
  heap: number[];
  node: TreeNode | null;
}
