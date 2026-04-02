import { TreeNode } from "@/widgets/binary-tree/model/binary-tree";
import { TreeArrayItem } from "@/widgets/binary-tree/model/types";
import type { Transition, Variants } from "motion/react";

export type NodeAnimations = {
  /** Variants for the outer wrapper (minVal slide / exit) */
  outerVariants?: Variants;
  /** Spring transition for the inner scale-in */
  appearTransition?: Transition;
  /** Delay applied when a node is inserted */
  insertedDelay?: number;
};

export type LineAnimations = {
  /** Duration for the base line draw (seconds) */
  drawDuration?: number;
  /** Duration for the highlighted (queue/found) line draw (seconds) */
  highlightDuration?: number;
};

export type LayoutAnimations = {
  /** Layout spring transition used by NodeLineWrapper */
  layoutTransition?: Transition;
};

export type CollapseAnimations = {
  /** Variant applied when a node wrapper collapses */
  collapseVariant?: Variants["collapse"];
  /** Variant applied when a child slides to its parent */
  slideToParentVariant?: Variants["slideToParent"];
};

export type CustomAnimations = {
  node?: NodeAnimations;
  line?: LineAnimations;
  layout?: LayoutAnimations;
  collapse?: CollapseAnimations;
};

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
  customAnimations?: CustomAnimations;
};