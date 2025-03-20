"use client";
import { useRef } from "react";
import { cn } from "@/shared/lib/utils";
import { delay, motion, MotionProps } from "framer-motion";

import { VisualArrayWrapperProps } from "@/features/visual-array";
import { MergeBaseArrayWrapper } from "./merge-base-array-wrapper";
import { SOURCE_SUB_ARRAY_ID, TARGET_SUB_ARRAY_ID } from "../constants";
import { getBoundingRect, getTargetSubArrayElement } from "../helpers";
import { useAnimationVariant } from "../hooks";

type MergeSubArrayWrapperProps = VisualArrayWrapperProps &
  MotionProps & {
    isSourceSubArray?: boolean;
    isTargetSubArray?: boolean;
    isGoBack?: boolean;
    isSubArrayMoving?: boolean;
  };

const getId = (isSourceSubArray?: boolean, isTargetSubArray?: boolean) => {
  if (isSourceSubArray) {
    return SOURCE_SUB_ARRAY_ID;
  }
  if (isTargetSubArray) {
    return TARGET_SUB_ARRAY_ID;
  }
  return undefined;
};

export const MergeSubArrayWrapper = ({
  className,
  isSourceSubArray,
  isTargetSubArray,
  isGoBack,
  isSubArrayMoving,
  ...props
}: MergeSubArrayWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const animationProps =
    isSubArrayMoving && isSourceSubArray ? getAnimationProps(ref) : {};
  const animationVariant = useAnimationVariant(
    isSubArrayMoving && isSourceSubArray,
    isGoBack
  );

  return (
    <div ref={ref} id={getId(isSourceSubArray, isTargetSubArray)}>
      <MergeBaseArrayWrapper
        component={motion.div}
        className={cn(className)}
        {...animationProps}
        animate={animationVariant}
        {...props}
      />
    </div>
  );
};

function getAnimationProps(ref: React.RefObject<HTMLDivElement | null>) {
  const sourceRect = getBoundingRect(ref.current);
  const targetRect = getBoundingRect(getTargetSubArrayElement(ref));

  if (!sourceRect || !targetRect) {
    return {
      layout: true,
      variants: {
        default: {
          x: 0,
          y: 0,
        },
        moveForward: {
          x: 0,
          y: 0,
        },
        moveBackward: { x: 0, y: 0 },
      },
      transition: { duration: 0 },
    };
  }

  const x = targetRect.left - sourceRect.left;
  const y = targetRect.top - sourceRect.top;

  return {
    layout: true,
    variants: {
      default: {
        x: 0,
        y: 0,
      },
      moveForward: {
        x: [0, x],
        y: [0, y],
      },
      moveBackward: { x: [x, 0,0], y: [y, 0,0] },
    },
  };
}

MergeSubArrayWrapper.displayName = "MergeSubArrayWrapper";
