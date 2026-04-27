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

export type SwapAnimations = {
  /** Duration (seconds) of the swap transition */
  duration?: number;
  /** Transition config for the swap */
  transition?: Transition;
};

export type CustomAnimations = {
  node?: NodeAnimations;
  line?: LineAnimations;
  layout?: LayoutAnimations;
  collapse?: CollapseAnimations;
  swap?: SwapAnimations;
};

export type FloatingNodeState = {
  value: number;
  key: string;
  /** If set, portal node starts FROM this tree node id on mount; else starts at anchor */
  initFromNodeId?: string;
  /** If set, portal node animates TO this tree node id; else stays at anchor */
  animateToNodeId?: string;
  /** If set, the matching tree node is rendered with visibility:hidden (push destination) */
  hiddenNodeId?: string;
  /** If set, the matching tree node is rendered as bg-background without content (pop source) */
  placeholderNodeId?: string;
  /** If set, a static, non-animating duplicate is rendered at the anchor with this text label */
  label?: string;
};

export type NodeArrayProps = {
  activeType: string | null;
  parentKey: any;
  groups: { [key: string]: TreeArrayItem[] };
  activeNode: TreeNode | null;
  insertedNode?: TreeNode | null;
  foundNodes?: TreeNode[] | null;
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
  swapNodes?: { parentId: string; childId: string } | null;
  floatingNodes?: FloatingNodeState[] | null;
};