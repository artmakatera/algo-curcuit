"use client";
import { useRef } from "react";
import { motion, type Transition } from "motion/react";
import type { MinMaxHeapViewProps } from "./type";
import { VisualArrayWrapper } from "@/features/visual-array/ui/visual-array-wrapper";
import { VisualArrayItem } from "@/features/visual-array/ui/visual-array-item";
import { ActionType, StepSnapshot } from "../../model/types";
import { cn } from "@/shared/lib/utils";
import { STEPS } from "../../model/constants";

export function ArrayView({
  activeType,
  currentSnapshot,
  isGoBack,
}: MinMaxHeapViewProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLDivElement>(null);
  const floatNodeRef = useRef<HTMLDivElement>(null);
  const heap = currentSnapshot.heap;
  const type = currentSnapshot.type;

  const isPushStep = type === STEPS.pushValue;
  const isPopValueStep =
    type === STEPS.popValue ||
    type === STEPS.moveLastToTop ||
    type === STEPS.movedLastToTop;

  const isAnimateSwapStep =
    type === STEPS.swap || type === STEPS.moveLastToTop;
  const isHoldSwapStep = type === STEPS.movedLastToTop;

  const swapIndexes = currentSnapshot.swapIndexes ?? [];

  return (
    <div className="mt-4">
      <div className="fixed bottom-48 left-12">
        {JSON.stringify(currentSnapshot, null, 2)}
      </div>
      <VisualArrayWrapper ref={wrapperRef}>
        {heap.map((value, index) => {
          const isLast = index === heap.length - 1;
          const isFirst = index === 0;

          if (isPushStep && isLast) {
            return null;
          }

          const isSwapping = swapIndexes.some((i) => i === index);
          const isComparing =
            currentSnapshot.compareIndexes?.some((i) => i === index) || false;

          const swapAnim = getSwapItemAnimation({
            index,
            isAnimateStep: isAnimateSwapStep,
            isHoldStep: isHoldSwapStep,
            swapIndexes,
            wrapperRef,
            isGoBack,
          });

          return (
            <motion.div
              key={index}
              initial={{ x: 0, y: 0 }}
              animate={swapAnim.animate}
              transition={swapAnim.transition}
            >
              <VisualArrayItem
                ref={isFirst ? firstItemRef : undefined}
                value={value}
                index={index}
                isSwapping={isSwapping}
                isComparing={isComparing}
                className={cn(isPopValueStep && isFirst && "invisible")}
              />
            </motion.div>
          );
        })}

        <VisualArrayItem
          value={0}
          index={-1}
          className="invisible"
          ref={lastItemRef}
        />
      </VisualArrayWrapper>
      {activeType.current ? (
        <VisualArrayWrapper className="mt-4 flex items-center gap-4">
          <div className="text-md text-muted-foreground uppercase whitespace-nowrap">
            {activeType.current === ActionType.pop && "Popped:"}
            {activeType.current === ActionType.peek && "Peeked:"}
            {activeType.current === ActionType.push && "Push:"}
          </div>
          <div className="w-12 h-12 relative" ref={floatNodeRef}>
            <VisualArrayItem
              className={cn(
                "opacity-50 absolute inset-0",
                "text-orange-600 dark:text-orange-400",
                "border-orange-600 dark:border-orange-400",
              )}
              value={currentSnapshot.value}
              index={-1}
            />
            <FloatingNode
              currentSnapshot={currentSnapshot}
              firstItemRef={firstItemRef}
              lastItemRef={lastItemRef}
              floatNodeRef={floatNodeRef}
              activeType={activeType}
              isGoBack={isGoBack}
            />
          </div>
        </VisualArrayWrapper>
      ) : null}
    </div>
  );
}

function FloatingNode({
  currentSnapshot,
  firstItemRef,
  lastItemRef,
  floatNodeRef,
  activeType,
  isGoBack
}: {
  currentSnapshot: StepSnapshot;
  firstItemRef: React.RefObject<HTMLDivElement | null>;
  lastItemRef: React.RefObject<HTMLDivElement | null>;
  floatNodeRef: React.RefObject<HTMLDivElement | null>;
  activeType: React.RefObject<ActionType | null>;
  isGoBack?: boolean;
}) {

  const shouldShow =
    activeType.current === ActionType.pop ||
    activeType.current === ActionType.peek ||
    activeType.current === ActionType.push;

  const { animKey, initial, animate } = getFloatNodeAnimation(
    currentSnapshot,
    lastItemRef,
    firstItemRef,
    floatNodeRef,
    activeType,
    isGoBack
  );

  if (!shouldShow) return null;

  return (
    <motion.div
      key={animKey}
      className="bg-background"
      initial={initial}
      animate={animate}
    >
      <VisualArrayItem value={currentSnapshot.value} index={-1} />
    </motion.div>
  );
}

function getFloatNodeAnimation(
  currentSnapshot: StepSnapshot,
  lastItemRef: React.RefObject<HTMLDivElement | null>,
  firstItemRef: React.RefObject<HTMLDivElement | null>,
  floatNodeRef: React.RefObject<HTMLDivElement | null>,
  activeType: React.RefObject<ActionType | null>,
  isGoBack?: boolean
) {
  const { type } = currentSnapshot;
  const floatNode = floatNodeRef.current;

  if (type === STEPS.pushValue && lastItemRef.current && floatNode) {

    const target = lastItemRef.current.getBoundingClientRect();
    const float = floatNode.getBoundingClientRect();

    if (isGoBack) {
      return {
        animKey: "push-go-back",
        initial: {
          x: target.left - float.left,
          y: target.top - float.top,
        },
        animate: { x: 0, y: 0 },
      };
    }
    return {
      animKey: "push",
      initial: { x: 0, y: 0 },
      animate: {
        x: target.left - float.left,
        y: target.top - float.top,
      },
    };
  }

  const isPopValueStep =
    type === STEPS.popValue || type === STEPS.startTraverse;

  if (
    activeType.current === ActionType.pop &&
    isPopValueStep &&
    firstItemRef.current &&
    floatNode
  ) {
    const source = firstItemRef.current.getBoundingClientRect();
    const float = floatNode.getBoundingClientRect();

    if (isGoBack) {
      return {
        animKey: "pop-go-back",
        initial: { x: 0, y: 0 },
        animate: {
          x: source.left - float.left,
          y: source.top - float.top,
        },
      };
    }
    return {
      animKey: "pop",
      initial: {
        x: source.left - float.left,
        y: source.top - float.top,
      },
      animate:  type === STEPS.popValue ? { x: 0, y: 0 } : { x: source.left - float.left, y: source.top - float.top },
    };
  }

  return {
    animKey: "rest",
    initial: { x: 0, y: 0 },
    animate: { x: 0, y: 0 },
  };
}

const ITEM_SIZE = 48;

function getSwapItemAnimation({
  index,
  isAnimateStep,
  isHoldStep,
  swapIndexes,
  wrapperRef,
  isGoBack,
}: {
  index: number;
  isAnimateStep: boolean;
  isHoldStep: boolean;
  swapIndexes: number[];
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  isGoBack?: boolean;
}) {
  const stillTransition: Transition = { duration: 0 };
  const rest = { animate: { x: 0, y: 0 }, transition: stillTransition };

  if (
    (!isAnimateStep && !isHoldStep) ||
    swapIndexes.length < 2 ||
    !wrapperRef.current ||
    !swapIndexes.includes(index)
  ) {
    return rest;
  }

  const isGoForward = swapIndexes[0] === index;
  const otherIdx = isGoForward ? swapIndexes[1] : swapIndexes[0];

  const children = wrapperRef.current.children;
  const self = children.item(index) as HTMLElement | null;
  const other = children.item(otherIdx) as HTMLElement | null;
  if (!self || !other) return rest;

  const targetX = other.offsetLeft - self.offsetLeft;
  const targetY = other.offsetTop - self.offsetTop;
  const deltaY = isGoForward ? ITEM_SIZE : -ITEM_SIZE;

  if (isHoldStep) {
    return {
      animate: { x: targetX, y: targetY },
      transition: stillTransition,
    };
  }

  const arcTransition: Transition = {
    duration: 0.7,
    type: "tween",
    ease: "easeInOut",
  };

  if (isGoBack) {
    return {
      animate: {
        x: [targetX, targetX, 0, 0],
        y: [targetY, targetY + deltaY, deltaY, 0],
      },
      transition: arcTransition,
    };
  }

  return {
    animate: {
      x: [0, 0, targetX, targetX],
      y: [0, deltaY, targetY + deltaY, targetY],
    },
    transition: arcTransition,
  };
}
