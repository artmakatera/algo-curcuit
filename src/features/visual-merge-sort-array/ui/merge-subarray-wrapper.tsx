"use client";
import { cn } from "@/shared/lib/utils";
import { motion, MotionProps } from "framer-motion";

import { VisualArrayWrapperProps } from "@/features/visual-array";
import { MergeBaseArrayWrapper } from "./merge-base-array-wrapper";
import { forwardRef } from "react";

export const MergeSubArrayWrapper = forwardRef<
  HTMLDivElement,
  VisualArrayWrapperProps & MotionProps
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref}>
      <MergeBaseArrayWrapper
        component={motion.div}
        className={cn(className)}
        {...props}
      />
    </div>
  );
});

MergeSubArrayWrapper.displayName = "MergeSubArrayWrapper";
