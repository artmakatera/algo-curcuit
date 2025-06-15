import { TreeNode } from "@/widgets/binary-tree/model/binary-tree";
import { TreeArrayItem } from "@/widgets/binary-tree/model/types";

export type NodeArrayProps = {
  activeType: string | null;
  parentKey: any;
  groups: { [key: string]: TreeArrayItem[] };
  activeNode: TreeNode | null;
  insertedNode?: TreeNode | null;
  foundNode?: TreeNode | null;
  nodeToRemove?: TreeNode | null;
  minValueNode?: TreeNode | null;
  isRemoveSingleChild?: boolean;
  isSingleChildToRemove?: boolean;
  parentRef?: React.RefObject<HTMLDivElement | null>;
  durationMs?: number;
  preventNodeEdgeAnimation?: boolean;
  isMinValueFirstRightChild?: boolean;
  isRightChildToRemove?: boolean;
  resultNodes?: TreeNode[];
  queueNodes?: TreeNode[];
  stackNodes?: TreeNode[];
  zIndex?: number;
  isParentMinNode?: boolean;
  isResultReversed?: boolean;
};