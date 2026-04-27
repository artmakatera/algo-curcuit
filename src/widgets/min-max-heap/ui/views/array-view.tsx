"use client";
import { useRef } from "react";
import { motion, type Transition } from "motion/react";
import type { MinMaxHeapViewProps } from "./type";
import { VisualArrayWrapper } from "@/features/visual-array/ui/visual-array-wrapper";
import { VisualArrayItem } from "@/features/visual-array/ui/visual-array-item";
import { ActionType, StepSnapshot } from "../../model/types";
import { cn } from "@/shared/lib/utils";
import { STEPS } from "../../model/constants";
import { a } from "vitest/dist/chunks/suite.d.FvehnV49.js";

export function ArrayView({
  activeType,
  currentSnapshot,
}: MinMaxHeapViewProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLDivElement>(null);
  const floatNodeRef = useRef<HTMLDivElement>(null);
  const heap = currentSnapshot.heap;

  const isPushStep = currentSnapshot.type === STEPS.pushValue;
  const isPopValueStep = currentSnapshot.type === STEPS.popValue || currentSnapshot.type === STEPS.moveLastToTop;
  const isSwapStep = currentSnapshot.type === STEPS.swap || currentSnapshot.type === STEPS.moveLastToTop;
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

          const isSwapping = swapIndexes.some((i) => i === index)
          const isComparing =
            currentSnapshot.compareIndexes?.some((i) => i === index) || false;

          const swapAnim = getSwapItemAnimation({
            index,
            isSwapStep,
            swapIndexes,
            wrapperRef,
          });

          return (
            <motion.div
              key={index}
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
}: {
  currentSnapshot: StepSnapshot;
  firstItemRef: React.RefObject<HTMLDivElement | null>;
  lastItemRef: React.RefObject<HTMLDivElement | null>;
  floatNodeRef: React.RefObject<HTMLDivElement | null>;
  activeType: React.RefObject<ActionType | null>;
}) {
  const { animKey, initial, animate } = getFloatNodeAnimation(
    currentSnapshot,
    lastItemRef,
    firstItemRef,
    floatNodeRef,
    activeType,
  );

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
) {
  const { type } = currentSnapshot;
  const floatNode = floatNodeRef.current;

  if (type === STEPS.pushValue && lastItemRef.current && floatNode) {
    const target = lastItemRef.current.getBoundingClientRect();
    const float = floatNode.getBoundingClientRect();
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
  isSwapStep,
  swapIndexes,
  wrapperRef,
}: {
  index: number;
  isSwapStep: boolean;
  swapIndexes: number[];
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}) {
  const stillTransition: Transition = { duration: 0 };
  const rest = { animate: { x: 0, y: 0 }, transition: stillTransition };

  if (
    !isSwapStep ||
    swapIndexes.length < 2 ||
    !wrapperRef.current ||
    !swapIndexes.includes(index)
  ) {
    return rest;
  }

  const isGoForward = swapIndexes[0] === index;
  const isGoBack = swapIndexes[1] === index;
  const otherIdx = isGoForward ? swapIndexes[1] : swapIndexes[0];

  const children = wrapperRef.current.children;
  const self = children.item(index) as HTMLElement | null;
  const other = children.item(otherIdx) as HTMLElement | null;
  if (!self || !other) return rest;

  const selfRect = self.getBoundingClientRect();
  const otherRect = other.getBoundingClientRect();
  const targetX = otherRect.left - selfRect.left;
  const targetY = otherRect.top - selfRect.top;
  const deltaY = isGoBack ? -ITEM_SIZE : ITEM_SIZE;

  return {
    animate: {
      x: [0, targetX, targetX],
      y: [deltaY, targetY + deltaY, targetY],
    },
    transition: {
      duration: 0.7,
      type: "tween",
      ease: "easeInOut",
    } as Transition,
  };
}
