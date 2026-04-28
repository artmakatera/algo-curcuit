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
        <>
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
          <HeapifyFormula
            currentSnapshot={currentSnapshot}
            activeType={activeType}
          />
        </>
      ) : null}
    </div>
  );
}

function HeapifyFormula({
  currentSnapshot,
  activeType,
}: {
  currentSnapshot: StepSnapshot;
  activeType: React.RefObject<ActionType | null>;
}) {
  const { type, index: currentIndex, heap } = currentSnapshot;

  const isPushHeapifyStep =
    activeType.current === ActionType.push &&
    currentIndex > 0 &&
    (type === STEPS.compareNodes ||
      type === STEPS.swap ||
      type === STEPS.swapped);

  const isPopHeapifyStep =
    activeType.current === ActionType.pop &&
    (type === STEPS.compareNodes ||
      type === STEPS.compareLeft ||
      type === STEPS.compareRight ||
      type === STEPS.swap ||
      type === STEPS.swapped);

  if (!isPushHeapifyStep && !isPopHeapifyStep) return null;

  return (
    <div className="mt-4 inline-block rounded-md border bg-muted/40 px-4 py-3 font-mono text-sm">
      {isPushHeapifyStep ? (
        <PushFormula currentIndex={currentIndex} heap={heap} />
      ) : (
        <PopFormula currentIndex={currentIndex} heap={heap} />
      )}
    </div>
  );
}

function PushFormula({
  currentIndex,
  heap,
}: {
  currentIndex: number;
  heap: number[];
}) {
  const parentIdx = Math.floor((currentIndex - 1) / 2);
  return (
    <div className="space-y-1">
      <div className="text-muted-foreground">
        parent(i) = ⌊(i−1)/2⌋
      </div>
      <div>
        parent(<IxVal i={currentIndex} v={heap[currentIndex]} />) ={" "}
        ⌊(<span className="font-semibold">{currentIndex}</span>−1)/2⌋ ={" "}
        <IxVal i={parentIdx} v={heap[parentIdx]} />
      </div>
    </div>
  );
}

function PopFormula({
  currentIndex,
  heap,
}: {
  currentIndex: number;
  heap: number[];
}) {
  const leftIdx = 2 * currentIndex + 1;
  const rightIdx = 2 * currentIndex + 2;
  const hasLeft = leftIdx < heap.length;
  const hasRight = rightIdx < heap.length;
  return (
    <div className="space-y-1">
      <div className="text-muted-foreground">
        left(i) = 2i+1, right(i) = 2i+2
      </div>
      <div className="flex flex-wrap gap-x-4">
        <span>
          i = <IxVal i={currentIndex} v={heap[currentIndex]} />
        </span>
        {hasLeft && (
          <span>
            left = <IxVal i={leftIdx} v={heap[leftIdx]} />
          </span>
        )}
        {hasRight && (
          <span>
            right = <IxVal i={rightIdx} v={heap[rightIdx]} />
          </span>
        )}
      </div>
    </div>
  );
}

function IxVal({ i, v }: { i: number; v: number }) {
  return (
    <span>
      <span className="font-semibold">{i}</span>
      <span className="text-muted-foreground">[{v}]</span>
    </span>
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
