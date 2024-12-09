"use client";
import { useRef } from "react";
import { motion } from "framer-motion";

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
  isSwapping,
}: AnimatedArrayItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const isGoBack = swapIndexes[1] === index;
  const isGoForward = swapIndexes[0] === index;

  return (
    <div ref={ref}>
      <motion.div
        animate={getAnimateValues(ref, isGoBack, isGoForward)}
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
