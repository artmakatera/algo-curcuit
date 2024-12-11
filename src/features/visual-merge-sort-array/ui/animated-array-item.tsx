"use client";
import { forwardRef, useRef } from "react";
import { motion } from "framer-motion";

// Components
import { VisualArrayItem } from "@/features/visual-array";
import { VisualSortArrayAnimatedProps } from "@/features/visual-sort-array-animated/ui/types";

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
  const { value, index, isMoveIndex, className, isComparing } = props;
  return (
    <div className="min-w-12 min-h-12" ref={ref}>
     {!isNaN(value) && <motion.div
        animate={
          getAnimateValues(props)
        }
        transition={{
          type: "linear",
          duration: isMoveIndex ? 1.7 : 0,
          delay: 0.3,
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
      </motion.div>}
    </div>
  );
});


function getAnimateValues({
  isMoveIndex,
  sourceRef,
  targetRef,

}: Partial<AnimatedArrayItemProps>  ) {
 

  if (!isMoveIndex || !sourceRef?.current || !targetRef?.current) {
    return {
      x: 0,
      y: 0,
    };
  }

  const sourcePosition = sourceRef.current.getBoundingClientRect();
  const targetPosition = targetRef.current.getBoundingClientRect();

  const targetX = targetPosition.left - sourcePosition.left;
  const targetY = targetPosition.top - sourcePosition.top;

  return {
    x: [0, targetX, targetX],
    y: [0, targetY, targetY],
  };
}

AnimatedArrayItem.displayName = "AnimatedArrayItem";
