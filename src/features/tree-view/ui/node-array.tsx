import { Node } from "./node";
import { cn } from "@/shared/lib/utils";
import { Line } from "./line";

import { TreeArrayItem } from "@/widgets/binary-tree/model/types";
import { motion, LayoutGroup } from "motion/react";
import { NodeArrayWrapper } from "./node-array-wrapper";
import { RefObject, useRef } from "react";
import { NodeLineWrapper } from "./node-line-wrapper";
import {
  getIsActiveNodes,
  getIsCompletedNode,
  getIsFoundNode,
  getIsNodeInserted,
  getIsQueueNode,
} from "../model/conditional-helpers";
import { NodeArrayProps, CustomAnimations } from "../types";

const getChildrenCount = (children: TreeArrayItem[] = []) =>
  children.filter(Boolean).length;

export const NodeArray = (props: NodeArrayProps) => {
  const { groups, parentKey } = props;

  return (
    <LayoutGroup>
      {groups?.[parentKey]?.map((item, index) => {
        return (
          <NodeArrayItem
            key={item?.node?.id || `index-${index}`}
            {...props}
            item={item}
            index={index}
          />
        );
      })}
    </LayoutGroup>
  );
};

function NodeArrayItem({
  item,
  index,
  ...props
}: NodeArrayProps & { item: TreeArrayItem; index: number }) {
  const {
    activeNode,
    activeType,
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
    isParentMinNode,
    isResultReversed,
    zIndex = 999,
    customAnimations,
  } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);

  if (!item) {
    return <NodeArrayWrapper className="w-10" index={index} />;
  }
  const { node, isLeft } = item;

  const hasChildren = getChildrenCount(groups[node.id]) > 0;
  const isNodeToRemove = nodeToRemove?.id === node.id;
  const isMinNode = minValueNode?.id === node.id;
  const isSingleRemove = isNodeToRemove && isRemoveSingleChild;

  const isChildAndRemove =
    isSingleChildToRemove || (isRightChildToRemove && !isLeft);

  const isCompleted = getIsNodeInserted(node, insertedNode);
  const isQueueNode = getIsQueueNode(node, queueNodes, stackNodes);
  const isResultNode = getIsCompletedNode(node, resultNodes || []);
  const shouldRenderParentLine =
    parentKey !== null && !isMinNode && !isChildAndRemove && !isParentMinNode;

  const getAnimationType = () => {
    if (isChildAndRemove) {
      return "slideToParent";
    }

    if (isNodeToRemove && !node.left && !node.right) {
      return "collapse";
    }

    return "normal";
  };

  return (
    <NodeArrayWrapper
      index={index}
      hasChildren={hasChildren}
      variants={getSlideToParentVariant(parentRef, wrapperRef, durationMs, customAnimations?.collapse)}
      animate={getAnimationType()}
    >
      <NodeLineWrapper
        activeType={activeType}
        isLeft={isLeft}
        isMinNode={isMinNode}
        zIndex={zIndex}
        id={node.id}
        customLayoutTransition={customAnimations?.layout?.layoutTransition}
      >
        {shouldRenderParentLine && (
          <Line
            className={cn(
              "-z-20",
              "bottom-1/2",
              hasChildren ? "w-full" : "w-1/2 left-1/2",
              !isLeft && !hasChildren && "w-1/2 left-0",
              "right-0"
            )}
            preventAnimation={preventNodeEdgeAnimation}
            isLeft={isLeft}
            found={isResultNode}
            isQueueLine={isQueueNode}
            isResultReversed={isResultReversed}
            customLineAnimations={customAnimations?.line}
          />
        )}
        <motion.div
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
            isQueueNode={isQueueNode}
            inserted={isCompleted}
            found={getIsFoundNode(node, foundNode)}
            isCompleted={isResultNode}
            isNodeToRemove={isNodeToRemove}
            isMinValueNode={isMinNode}
            preventAnimation={preventNodeEdgeAnimation}
            hasChildren={hasChildren}
            customNodeAnimations={customAnimations?.node}
          />
        </motion.div>
      </NodeLineWrapper>
      <NodeArray
        {...props}
        parentKey={node.id}
        isSingleChildToRemove={isSingleRemove}
        isRightChildToRemove={isNodeToRemove && isMinValueFirstRightChild}
        isParentMinNode={isMinNode}
        parentRef={wrapperRef}
        zIndex={zIndex - 1}
      />
    </NodeArrayWrapper>
  );
}

function getSlideToParentVariant(
  parentRef?: RefObject<HTMLDivElement | null>,
  ref?: RefObject<HTMLDivElement | null>,
  durationMs: number = 750,
  collapseAnimations?: CustomAnimations["collapse"]
) {
  if (!parentRef || !ref) return undefined;
  const parentRect = parentRef.current?.getBoundingClientRect();
  const rect = ref.current?.getBoundingClientRect();

  if (!parentRect || !rect) return undefined;
  const x = parentRect.x - rect.x;
  const y = parentRect.y - rect.y;

  return {
    collapse: collapseAnimations?.collapseVariant ?? {
      delay: 0.1,
      scale: 0,
    },
    slideToParent: collapseAnimations?.slideToParentVariant ?? {
      x,
      y,
      zIndex: 9999,

      transition: {
        duration: durationMs / 1000,
      },
    },
  };
}
