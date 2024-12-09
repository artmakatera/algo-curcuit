"use client";
import { useRef } from "react";
import { motion } from "framer-motion";

// Components
import { VisualArrayItem } from "@/features/visual-array";
import { VisualSortArrayAnimatedProps } from "@/features/visual-sort-array-animated/ui/types";

// Helpers

export type AnimatedArrayItemProps = {
  value: number;
  index: number;
  className?: string;
};

export const AnimatedArrayItem = ({
  value,
  index,

  className,
}: AnimatedArrayItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="w-12" ref={ref}>
      <motion.div
      // animate={getAnimateValues(ref, isGoBack, isGoForward)}
      // transition={getTransition(isGoBack, isGoForward)}
      >
        <VisualArrayItem className={className} value={value} index={index} />
      </motion.div>
    </div>
  );
};
