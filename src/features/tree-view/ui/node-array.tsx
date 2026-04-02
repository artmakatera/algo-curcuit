import { Node } from "./node";
import { cn } from "@/shared/lib/utils";
import { Line } from "./line";

import { TreeArrayItem } from "@/widgets/binary-tree/model/types";
import { motion, LayoutGroup, Variants } from "motion/react";
import { NodeArrayWrapper } from "./node-array-wrapper";
import { RefObject, useEffect, useRef } from "react";
import { NodeLineWrapper } from "./node-line-wrapper";
import {
  getIsActiveNodes,
  getIsCompletedNode,
  getIsFoundNode,
  getIsNodeInserted,
  getIsQueueNode,
} from "../model/conditional-helpers";
import { NodeArrayProps, CustomAnimations } from "../types";
import { useSwap } from "../context/swap-context";

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
    swapNodes,
  } = props;

  const { swapChildElement, registerSwapChild } = useSwap();

  const wrapperRef = useRef<HTMLDivElement>(null);

  const isSwapChild = swapNodes?.childId === item?.node?.id;
  const isSwapParent = swapNodes?.parentId === item?.node?.id;

  useEffect(() => {
    if (isSwapChild && wrapperRef.current) {
      registerSwapChild(wrapperRef.current);
    }
    return () => {
      if (isSwapChild) registerSwapChild(null);
    };
  }, [isSwapChild, registerSwapChild]);

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
          animate={getSwapAnimateState(isSwapChild, isSwapParent)}
          variants={getSwapVariants(
            isSwapChild,
            isSwapParent,
            wrapperRef,
            parentRef,
            swapChildElement,
            customAnimations?.swap?.transition,
            customAnimations?.swap?.duration,
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
            isSwapNode={isSwapChild || isSwapParent}
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

function getSwapAnimateState(
  isSwapChild: boolean,
  isSwapParent: boolean
): string | undefined {
  if (isSwapChild) return "swapUp";
  if (isSwapParent) return "swapDown";
  return undefined;
}

function getSwapVariants(
  isSwapChild: boolean,
  isSwapParent: boolean,
  wrapperRef: RefObject<HTMLDivElement | null>,
  parentRef?: RefObject<HTMLDivElement | null>,
  swapChildElement?: HTMLDivElement | null,
  customTransition?: import("motion/react").Transition,
  customDuration?: number,
) {
  if (!isSwapChild && !isSwapParent) return undefined;

  const defaultTransition: import("motion/react").Transition = customTransition ?? {
    type: "spring",
    duration: customDuration ?? 0.4,
    bounce: 0.15,
  };

  const variants: Variants = {};

  if (isSwapChild && parentRef?.current && wrapperRef.current) {
    const parentRect = parentRef.current.getBoundingClientRect();
    const childRect = wrapperRef.current.getBoundingClientRect();
    variants.swapUp = {
      x: parentRect.x - childRect.x,
      y: parentRect.y - childRect.y,
      zIndex: 9999,
      transition: defaultTransition,
    };
  }

  if (isSwapParent && swapChildElement && wrapperRef.current) {
    const parentRect = wrapperRef.current.getBoundingClientRect();
    const childRect = swapChildElement.getBoundingClientRect();
    variants.swapDown = {
      x: childRect.x - parentRect.x,
      y: childRect.y - parentRect.y,
      zIndex: 9999,
      transition: defaultTransition,
    };
  }

  return variants;
}
