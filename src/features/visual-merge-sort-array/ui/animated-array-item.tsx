"use client";
import { forwardRef, useRef } from "react";
import { m, motion } from "framer-motion";

// Components
import { VisualArrayItem } from "@/features/visual-array";

// Helpers

export type AnimatedArrayItemProps = {
  value: number;
  index: number;
  className?: string;
  sourceRef?: React.RefObject<HTMLDivElement>;
  targetRef?: React.RefObject<HTMLDivElement>;
  isMoveIndex?: boolean;
  isTargetIndex?: boolean;
  isGoBack?: boolean;
  isGoForward?: boolean;
  isComparing?: boolean;
};

export const AnimatedArrayItem = forwardRef<
  HTMLDivElement,
  AnimatedArrayItemProps
>((props, ref) => {
  const {
    value,
    index,
    isMoveIndex,
    className,
    isComparing,
    isGoBack,
    sourceRef,
    targetRef,
  } = props;
  isMoveIndex &&
    console.log(
      "AnimatedArrayItem -> isMoveIndex",
      isMoveIndex,
      sourceRef,
      targetRef
    );

  return (
    <div className="w-12 h-12" ref={ref}>
      {!isNaN(value) && (
        <motion.div
          layout
          variants={getAnimatedVariants(props)}
          animate={getCurrentAnimation(props, isGoBack)}
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
});

const getBoundingRect = (ref?: React.RefObject<HTMLDivElement>) => {
  if (!ref?.current) {
    return {
      left: -9999,
      top: -9999,
    };
  }

  return ref.current.getBoundingClientRect();
};

function getCurrentAnimation(
  props: AnimatedArrayItemProps,
  isGoBack?: boolean
) {
  if (!props.isMoveIndex) {
    return "default";
  }

  if (isGoBack) {
    return "moveBackward";
  }

  return "moveForward";
}

function getAnimatedVariants({
  sourceRef,
  targetRef,
}: Partial<AnimatedArrayItemProps>) {
  const sourcePosition = getBoundingRect(sourceRef);
  const targetPosition = getBoundingRect(targetRef);

  const targetX = targetPosition.left - sourcePosition.left;
  const targetY = targetPosition.top - sourcePosition.top;

  return {
    default: {},
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
