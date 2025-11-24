"use client";
import { useMemo, useRef } from "react";
import { motion } from "motion/react";

// Components
import { VisualArrayItem } from "@/features/visual-array";
import { AnimatedArrayItemProps } from "./types";

// Helpers
import { getAnimateValues, getTransition } from "../model";

export const AnimatedArrayItem = ({
  value,
  index,
  compareIndexes = [],
  swapIndexes = [],
  sortedIndex,
  indexToUpdate,
  pivotIndex,
  getIsSorted = () => false,
  wrapperRef,
  isSwapping,
}: AnimatedArrayItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const isGoBack = swapIndexes[1] === index;
  const isGoForward = swapIndexes[0] === index;

  const [element, elementToSwap] = useMemo(() => {
    
    const children = wrapperRef?.current?.children;
    const swapIndex = swapIndexes.find((i) => i !== index);
    const element = children?.item(index) as HTMLDivElement;
    const elementToSwap = children?.item(swapIndex ?? -1) as HTMLDivElement;
    
    if (!element || !elementToSwap) {
      return [null, null];
    }

    return [element, elementToSwap];
  }, [wrapperRef, index, swapIndexes]);

  return (
    <div ref={ref}>
      <motion.div
        animate={getAnimateValues({element, elementToSwap, isGoBack, isGoForward})}
        transition={getTransition(isGoBack, isGoForward)}
      >
        <VisualArrayItem
          value={value}
          index={index}
          isComparing={compareIndexes.some((i) => i === index)}
          isSwapping={isSwapping}
          isSorted={getIsSorted(index, sortedIndex || -1)}
          currentSortItem={index === indexToUpdate}
          isPivot={index === pivotIndex}
        />
      </motion.div>
    </div>
  );
};
