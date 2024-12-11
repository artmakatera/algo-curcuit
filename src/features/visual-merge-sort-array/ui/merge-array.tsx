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
}

export const MergeArray = ({
  array,
  sourceRef,
  targetRef,
  indexOfSourceSubArray,
  indexOfTargetSubArray,
  moveIndex,
  targetIndex,
  subArraysIndexesToMerge,
  sourceIndexesToMerge,
  isSourceArray,
  isSubArrayMoving,
}: MergeArrayProps) => {
  if (array === null) {
    return null;
  }

  return (
    <div>
      <MergeArrayWrapper>
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
                  !isSourceArray &&
                    subArray.length > 1 &&
                    subArray.every(isNaN) &&
                    "bg-transparent"
                )}
                ref={
                  isSubArrayMoving
                    ? setSubArrayRef(
                        sourceRef,
                        targetRef,
                        isSourceSubArray,
                        isTargetSubArray
                      )
                    : null
                }
                {...getSubArrayAnimationProps(
                  isSubArrayMoving && isSourceSubArray,
                  sourceRef,
                  targetRef
                )}
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
                      ref={
                        isSubArrayMoving
                          ? null
                          : setItemRef(
                              sourceRef,
                              targetRef,
                              isMoveIndex,
                              isTargetSubArray
                            )
                      }
                      isMoveIndex={isMoveIndex}
                      isTargetIndex={isTargetIndex}
                      isComparing={isComparing}
                      sourceRef={sourceRef}
                      targetRef={targetRef}
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
                ref={
                  isSubArrayMoving
                    ? null
                    : setItemRef(
                        sourceRef,
                        targetRef,
                        isMoveIndex,
                        isTargetIndex
                      )
                }
                isMoveIndex={isMoveIndex}
                isTargetIndex={isTargetIndex}
                sourceRef={sourceRef}
                targetRef={targetRef}
              />
            );
          })}
      </MergeArrayWrapper>
    </div>
  );
};

function setItemRef(
  sourceRef?: React.RefObject<HTMLDivElement>,
  targetRef?: React.RefObject<HTMLDivElement>,
  isMoveIndex?: boolean,
  isTargetIndex?: boolean
) {
  if (isMoveIndex) {
    return sourceRef;
  }

  if (isTargetIndex) {
    return targetRef;
  }

  return null;
}

function setSubArrayRef(
  sourceRef?: React.RefObject<HTMLDivElement>,
  targetRef?: React.RefObject<HTMLDivElement>,
  isSourceSubArray?: boolean,
  isTargetSubArray?: boolean
) {
  if (isSourceSubArray) {
    return sourceRef;
  }

  if (isTargetSubArray) {
    return targetRef;
  }

  return null;
}

function getSubArrayAnimationProps(
  isSubArrayMoving?: boolean,
  sourceRef?: React.RefObject<HTMLDivElement>,
  targetRef?: React.RefObject<HTMLDivElement>
) {
  if (!isSubArrayMoving || !sourceRef?.current || !targetRef?.current) {
    return {
      initial: { x: 0, y: 0 },
      animate: { x: 0, y: 0 },
    };
  }

  const sourceRect = sourceRef.current.getBoundingClientRect();
  const targetRect = targetRef.current.getBoundingClientRect();

  const x = targetRect.x - sourceRect.x;
  const y = targetRect.y - sourceRect.y;

  return {
    initial: { x: 0, y: 0 },
    animate: { x, y },
  };
}
