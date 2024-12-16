"use client";
import { useRef } from "react";
import { MERGE_ARRAYS_WRAPPER_ID, MergeArray } from "@/features/visual-merge-sort-array";
import { StepSnapshot } from "../model/types";
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  motion,
} from "framer-motion";
import { STEPS } from "../model";
import { cn } from "@/shared/lib/utils";

interface MergeArraysProps {
  currentSnapshot: StepSnapshot;
  isGoBack?: boolean;
}

export const MergeArrays = ({ currentSnapshot, isGoBack }: MergeArraysProps) => {
  const sourceRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const {
    type,
    firstArray,
    secondArray,
    indexOfSourceSubArray,
    indexOfTargetSubArray,
    subArraysIndexesToMerge,
    moveIndex,
    targetIndex,
    sourceIndexesToMerge,
  } = currentSnapshot;


  const open = type !== STEPS.collapsePreviousArray;
  const isSubArrayMoving  = type === STEPS.moveSubArray || type === STEPS.movingSubArray;

  return (
    <div id={MERGE_ARRAYS_WRAPPER_ID} className={cn("grid gap-8 pt-8")}>
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        initial="visible"
        animate={open ? "visible" : "hidden"}
      >
        <MergeArray
          array={firstArray}
          sourceRef={sourceRef}
          targetRef={targetRef}
          indexOfSourceSubArray={indexOfSourceSubArray}
          moveIndex={moveIndex}
          subArraysIndexesToMerge={subArraysIndexesToMerge}
          sourceIndexesToMerge={sourceIndexesToMerge}
          isSubArrayMoving={isSubArrayMoving}
          isSourceArray
          isGoBack={isGoBack}
        />
      </motion.div>
      <motion.div
        variants={{
          start: { y: 0 },
          moved: { y: -72 - 32 },
        }}
        initial="start"
        animate={open ? "start" : "moved"}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <MergeArray
          array={secondArray}
          sourceRef={targetRef}
          targetRef={targetRef}
          indexOfTargetSubArray={indexOfTargetSubArray}
          targetIndex={targetIndex}
          isSubArrayMoving={isSubArrayMoving}
          isGoBack={isGoBack}

        />
      </motion.div>
    </div>
  );
};
