"use client";
import { useRef } from "react";
import { motion, type Transition } from "motion/react";
import type { MinMaxHeapViewProps } from "../type";
import { VisualArrayWrapper } from "@/features/visual-array/ui/visual-array-wrapper";
import { VisualArrayItem } from "@/features/visual-array/ui/visual-array-item";
import { ActionType } from "../../../model/types";
import { cn } from "@/shared/lib/utils";
import { STEPS } from "../../../model/constants";
import { FloatingNode } from "./floating-node";
import { HeapifyFormula } from "./heapify-formula";

const ITEM_SIZE = 48;

export function ArrayView({
  activeType,
  currentSnapshot,
  isGoBack,
  delayRef
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


  const isAnimateSwapStep = type === STEPS.swap || type === STEPS.moveLastToTop;
  const isHoldSwapStep = type === STEPS.movedLastToTop;

  const swapIndexes = currentSnapshot.swapIndexes ?? [];
  const animDuration = (Number(delayRef.current ?? 750) * 0.8 /1000);

  return (
    <div className="mt-4">
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

          const isInvisible = isPopValueStep && isFirst;
          const swapAnim = isInvisible
            ? { animate: { x: 0, y: 0 }, transition: { duration: 0 } as Transition }
            : getSwapItemAnimation({
                index,
                isAnimateStep: isAnimateSwapStep,
                isHoldStep: isHoldSwapStep,
                swapIndexes,
                wrapperRef,
                isGoBack,
                animDuration,
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
        <>
          <VisualArrayWrapper className="flex items-center gap-4">
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
                animDuration={animDuration}
              />
            </div>
          </VisualArrayWrapper>
        </>
      ) : null}
      <HeapifyFormula
        currentSnapshot={currentSnapshot}
        activeType={activeType}
      />
    </div>
  );
}

function getSwapItemAnimation({
  index,
  isAnimateStep,
  isHoldStep,
  swapIndexes,
  wrapperRef,
  isGoBack,
  animDuration,
}: {
  index: number;
  isAnimateStep: boolean;
  isHoldStep: boolean;
  swapIndexes: number[];
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  isGoBack?: boolean;
  animDuration: number;
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

  const arcTransition: Transition = {
    duration: isHoldStep ? 0 : animDuration,
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
