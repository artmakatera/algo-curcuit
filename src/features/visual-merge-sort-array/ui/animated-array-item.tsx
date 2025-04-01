"use client";
import {  useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

// Components
import { VisualArrayItem } from "@/features/visual-array";
import {
  MERGE_ARRAYS_WRAPPER_ID,
  MOVE_ITEM_ID,
  TARGET_ITEM_ID,
} from "../constants";
import { getBoundingRect, getCurrentAnimation } from "../helpers";
import { useAnimationVariant } from "../hooks";

// Helpers

const getId = (isMoveIndex?: boolean, isTargetIndex?: boolean) => {
  if (isMoveIndex) {
    return MOVE_ITEM_ID;
  }

  if (isTargetIndex) {
    return TARGET_ITEM_ID;
  }

  return undefined;
};

export type AnimatedArrayItemProps = {
  value: number;
  index: number;
  className?: string;
  sourceRef?: React.RefObject<HTMLDivElement | null>;
  targetRef?: React.RefObject<HTMLDivElement | null>;
  isMoveIndex?: boolean;
  isTargetIndex?: boolean;
  isGoBack?: boolean;
  isGoForward?: boolean;
  isComparing?: boolean;
};

export const AnimatedArrayItem = (props: AnimatedArrayItemProps) => {
  const {
    value,
    index,
    isMoveIndex,
    isTargetIndex,
    className,
    isComparing,
    isGoBack,
  } = props;
  const ref = useRef<HTMLDivElement>(null);
  const animationVariant = useAnimationVariant(isMoveIndex, isGoBack);


  return (
    <div className="w-12 h-12" ref={ref} id={getId(isMoveIndex, isTargetIndex)}>
      {!isNaN(value) && (
        <motion.div
          layout
          variants={getAnimatedVariants(!!isMoveIndex, ref)}
          animate={animationVariant}
          transition={{
            type: "linear",
            duration: isMoveIndex ? 1.7 : 0,
          }}
        >
          <VisualArrayItem
            className={className}
            value={value}
            index={index}
            isChecking={isMoveIndex}
            isComparing={isComparing}
            initialClassName="bg-background"
          />
        </motion.div>
      )}
    </div>
  );
};


const getTargetElement = (ref?: React.RefObject<HTMLDivElement | null>) => {
  if (!ref?.current) {
    return null;
  }

  const arrayWrapper = ref.current.closest(`#${MERGE_ARRAYS_WRAPPER_ID}`);

  return arrayWrapper?.querySelector(`#${TARGET_ITEM_ID}`) as HTMLDivElement;
};



function getAnimatedVariants(
  isMoveIndex: boolean,
  ref: React.RefObject<HTMLDivElement | null>
) {
  const defaultVariants = {
    default: {
      x: 0,
      y: 0,
    },
    moveForward: {
      x: 0,
      y: 0,
    },
    moveBackward: { x: 0, y: 0 },
  };
  if (!isMoveIndex) {
    return defaultVariants;
  }

  const sourcePosition = getBoundingRect(ref.current);
  const targetPosition = getBoundingRect(getTargetElement(ref));

  if (!sourcePosition || !targetPosition) {
    return defaultVariants;
  }

  const targetX = targetPosition.left - sourcePosition.left;
  const targetY = targetPosition.top - sourcePosition.top;

  return {
    default: {
      x: 0,
      y: 0,
    },
    moveForward: {
      x: [0, targetX, targetX],
      y: [0, targetY, targetY],
    },
    moveBackward: {
      x: [targetX, 0, 0],
      y: [targetY, 0, 0],
    },
  };
}

AnimatedArrayItem.displayName = "AnimatedArrayItem";
