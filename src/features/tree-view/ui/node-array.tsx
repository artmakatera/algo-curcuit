import { Node } from "./node";
import { cn } from "@/shared/lib/utils";
import { Line } from "./line";

import { TreeArrayItem } from "@/widgets/binary-tree/model/types";
import { TreeNode } from "@/widgets/binary-tree/model/binary-tree";
import { AnimatePresence } from "framer-motion";
import { NodeArrayWrapper } from "./node-array-wrapper";
import { useRef } from "react";
import { NodeLineWrapper } from "./NodeLineWrapper";

const getLen = (childrenArr: TreeArrayItem[]) =>
  childrenArr?.filter(Boolean)?.length || 0;

type NodeArrayProps = {
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
};

export const NodeArray = (props: NodeArrayProps) => {
  const { groups, parentKey } = props;

  return (
    <AnimatePresence>
      {groups[parentKey]?.map((item, index) => {
        return (
          <NodeArrayItem
            key={item?.node?.id || `index-{index}`}
            {...props}
            item={item}
            index={index}
          />
        );
      })}
    </AnimatePresence>
  );
};

function NodeArrayItem({
  item,
  index,
  ...props
}: NodeArrayProps & { item: TreeArrayItem; index: number }) {
  const {
    activeNode,
    groups,
    parentKey,
    insertedNode,
    foundNode,
    nodeToRemove,
    minValueNode,
    isRemoveSingleChild,
    isSingleChildToRemove,
    parentRef,
    durationMs,
    preventNodeEdgeAnimation,
    isMinValueFirstRightChild,
    isRightChildToRemove,
    resultNodes,
    queueNodes,
    stackNodes,
    zIndex = 9999,
  } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);

  if (!item) {
    return (
      <NodeArrayWrapper key={`index-{index}`} className="w-10" index={index} />
    );
  }
  const { node, isLeft } = item;

  const hasChildren = getLen(groups[node.id]) > 0;
  const isNodeToRemove = nodeToRemove?.id === node.id;
  const isMinNode = minValueNode?.id === node.id;
  const isSingleRemove = isNodeToRemove && isRemoveSingleChild;

  const isChildAndRemove =
    isSingleChildToRemove || (isRightChildToRemove && !isLeft);

  const isCompleted = getIsNodeInserted(node, insertedNode);

  return (
    <NodeArrayWrapper
      index={index}
      animate={
        isSingleRemove && hasChildren
          ? "singleChildRemove"
          : isChildAndRemove
          ? "slideToParent"
          : "normal"
      }
      hasChildren={hasChildren}
      variants={getSlideToParentVariant(parentRef, wrapperRef, durationMs)}
    >
      <NodeLineWrapper isLeft={isLeft} zIndex={zIndex}>
        {parentKey !== null && !isMinNode && !isChildAndRemove && (
          <Line
            className={cn(
              "-z-20",
              isLeft ? "bottom-1/2 " : " bottom-1/2",
              hasChildren ? "w-full" : "w-1/2 left-1/2",
              !isLeft && !hasChildren && "w-1/2 left-0",
              "right-0"
            )}
            preventAnimation={preventNodeEdgeAnimation}
            isLeft={isLeft}
            found={getIsCompletedNode(node, resultNodes || [])}
            isQueueLine={getIsQueueNode(node, queueNodes, stackNodes)}
          />
        )}
        <div
          ref={wrapperRef}
          key="node-wrapper"
          className={cn(
            "relative w-fit z-50",
            hasChildren && `${isLeft ? "-" : ""}translate-x-1/2`
          )}
        >
          <Node
            current={node}
            active={getIsActiveNodes(node, activeNode)}
            isQueueNode={getIsQueueNode(node, queueNodes, stackNodes)}
            inserted={isCompleted}
            found={getIsFoundNode(node, foundNode)}
            isCompleted={getIsCompletedNode(node, resultNodes || [])}
            isNodeToRemove={isNodeToRemove}
            isMinValueNode={isMinNode}
            preventAnimation={preventNodeEdgeAnimation}
            hasChildren={hasChildren}
          />
        </div>
      </NodeLineWrapper>
      <NodeArray
        {...props}
        parentKey={node.id}
        isSingleChildToRemove={isSingleRemove}
        isRightChildToRemove={isNodeToRemove && isMinValueFirstRightChild}
        parentRef={wrapperRef}
        zIndex={zIndex - 1}
      />
    </NodeArrayWrapper>
  );
}

function getIsCompletedNode(node: TreeNode, resultNodes: TreeNode[]) {
  return resultNodes.some((n) => n.id === node.id);
}

function getIsFoundNode(node: TreeNode, foundNode?: TreeNode | null) {
  return foundNode?.id === node.id;
}

function getIsNodeInserted(node: TreeNode, insertedNode?: TreeNode | null) {
  return insertedNode?.id === node.id;
}

function getIsQueueNode(
  node: TreeNode,
  queueNodes?: TreeNode[],
  stackNodes?: TreeNode[]
) {
  if (Array.isArray(queueNodes) && queueNodes.length > 0) {
    return queueNodes.some((n) => n.id === node.id);
  }

  return getIsStackNode(node, stackNodes);
}

function getIsActiveNodes(node: TreeNode, activeNode: TreeNode | null) {
  return activeNode?.id === node.id;
}

function getIsStackNode(node: TreeNode, stackNodes?: TreeNode[]) {
  if (Array.isArray(stackNodes) && stackNodes.length > 0) {
    return stackNodes.some((n) => n.id === node.id);
  }

  return false;
}

function getSlideToParentVariant(
  parentRef?: React.RefObject<HTMLDivElement | null>,
  ref?: React.RefObject<HTMLDivElement | null>,
  durationMs: number = 750
) {
  if (!parentRef || !ref) return undefined;
  const parentRect = parentRef.current?.getBoundingClientRect();
  const rect = ref.current?.getBoundingClientRect();

  const { width: currentWidth } =
    ref.current?.parentElement?.getBoundingClientRect() || { width: 0 };
  if (!parentRect || !rect) return undefined;
  const x = parentRect.x - rect.x;
  const y = parentRect.y - rect.y;

  return {
    slideToParent: {
      x,
      y,
      zIndex: 9999,

      transition: {
        duration: durationMs / 1000,
      },
    },
    singleChildRemove: {
      zIndex: 9999,
      paddingLeft: currentWidth / 2,
    },
  };
}
