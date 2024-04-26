import { BaseSnapshot } from "@/shared/types/snapshot";
import { STEPS } from "./constants";
import { TreeNode } from "./binary-tree";


export type ActionType = "find" | "insert" | "delete";

export type DispatchPayload = {
  type: ActionType;
  value: number;
};

export type Dispatch = (d: DispatchPayload) => void;


export type GenValuePayload = {
  type: Partial<STEPS>;
  node: TreeNode,
  treeView: TreeViewItem[]
};

export type GenValue = Generator<GenValuePayload, void, number>;

export type TreeViewItem = {

  current: TreeNode | null | undefined,
  result: Partial<TreeViewItem>[],
  level: number,
  height: number,
  isLeft?: boolean,
  x?: number,
  y?: number,
  parent?: Partial<TreeViewItem> | null
}


export interface StepSnapshot extends BaseSnapshot {
  type: Partial<STEPS>,
  highlightLines: number[],
  node: TreeNode,
  treeView: TreeViewItem[]
};


