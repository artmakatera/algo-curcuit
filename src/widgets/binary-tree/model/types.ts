import { BaseSnapshot } from "@/shared/types/snapshot";
import { STEPS } from "./constants";
import { TreeNode } from "./binary-tree";


export type ActionType = "find" | "insert" | "delete" | "bfs";

export type DispatchPayload = {
  type: ActionType;
  value: number | null;
  canClose?: boolean;
};

export type Dispatch = (d: DispatchPayload) => void;


export type GenValuePayload = {
  type: Partial<STEPS>;
  node: TreeNode,
  treeView: TreeArrayItem[],
  queue?: TreeNode[],
  result?: number[],
  insertedNode?: TreeNode,
  nodeToRemove?: TreeNode,
  minValueNode?: TreeNode,
};

export type GenValue = Generator<GenValuePayload, void, number>;


export interface StepSnapshot extends BaseSnapshot {
  type: Partial<STEPS>,
  node: TreeNode,
  insertedNode?: TreeNode,
  deleteNode?: TreeNode,
  nodeToRemove?: TreeNode,
  minValueNode?: TreeNode,
  queue?: TreeNode[],
  result?: number[],
  treeView: TreeArrayItem[]
};


export type TreeArrayItem = {
  node: TreeNode;
  parent: TreeNode | null;
  isLeft: boolean;
}

export type TreeArrayGroups = { [key: string]: TreeArrayItem[] }




