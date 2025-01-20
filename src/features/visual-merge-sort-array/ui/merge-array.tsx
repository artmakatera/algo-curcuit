"use client";

import { cn } from "@/shared/lib/utils";
import { AnimatedArrayItem } from "./animated-array-item";
import { MergeArrayWrapper } from "./merge-array-wrapper";
import { MergeSubArrayWrapper } from "./merge-subarray-wrapper";

interface MergeArrayProps {
  array: number[][] | number[] | null;
  sourceRef?: React.RefObject<HTMLDivElement>;
  targetRef?: React.RefObject<HTMLDivElement>;
  indexOfSourceSubArray?: number;
  indexOfTargetSubArray?: number;
  moveIndex?: number;
  targetIndex?: number;
  subArraysIndexesToMerge?: [number, number];
  isSourceArray?: boolean;
  isSubArrayMoving?: boolean;
  sourceIndexesToMerge?: number[];
  isGoBack?: boolean;
  hideSubArray?: boolean;
}

export const MergeArray = ({
  array,
  indexOfSourceSubArray,
  indexOfTargetSubArray,
  moveIndex,
  targetIndex,
  subArraysIndexesToMerge,
  sourceIndexesToMerge,
  isSourceArray,
  isSubArrayMoving,
  isGoBack,
  hideSubArray,
}: MergeArrayProps) => {
  if (array === null) {
    return null;
  }

  return (
    <div>
      <MergeArrayWrapper className={cn(!isSourceArray && "overflow-hidden")}>
        {Array.isArray(array[0]) &&
          array.map((subArrayProp, index) => {
            const subArray = subArrayProp as number[];
            const isSourceSubArray = indexOfSourceSubArray === index;
            const isTargetSubArray = indexOfTargetSubArray === index;
            const isMergeSubArray =
              isSourceArray && subArraysIndexesToMerge?.includes(index);

            return (
              <MergeSubArrayWrapper
                key={index}
                className={cn(
                  isMergeSubArray && " bg-blue-300/35",
                  hideSubArray && "bg-transparent shadow-none",

                  !isSourceArray &&
                    subArray.length > 1 &&
                    subArray.every(isNaN) &&
                    "bg-transparent"
                )}
                isSourceSubArray={isSourceSubArray}
                isTargetSubArray={isTargetSubArray}
                isGoBack={isGoBack}
                isSubArrayMoving={isSubArrayMoving}
              >
                {subArray.map((value, index) => {
                  const isMoveIndex = isSourceSubArray && moveIndex === index;
                  const isTargetIndex =
                    isTargetSubArray && targetIndex === index;

                  const isComparing =
                    isMergeSubArray && sourceIndexesToMerge?.includes(index);

                  return (
                    <AnimatedArrayItem
                      key={index}
                      value={value}
                      index={index}
                      isMoveIndex={isMoveIndex}
                      isTargetIndex={isTargetIndex}
                      isComparing={isComparing}
                      isGoBack={isGoBack}
                    />
                  );
                })}
              </MergeSubArrayWrapper>
            );
          })}
        {typeof array[0] === "number" &&
          array.map((value, index) => {
            const isMoveIndex = moveIndex === index;
            const isTargetIndex = targetIndex === index;
            return (
              <AnimatedArrayItem
                key={index}
                value={value as number}
                index={index}
                isMoveIndex={isMoveIndex}
                isTargetIndex={isTargetIndex}
                isGoBack={isGoBack}
              />
            );
          })}
      </MergeArrayWrapper>
    </div>
  );
};
