"use client";
import { cn } from "@/shared/lib/utils";
import { motion, MotionProps } from "framer-motion";

import { VisualArrayWrapperProps } from "@/features/visual-array";
import { MergeBaseArrayWrapper } from "./merge-base-array-wrapper";

export const MergeSubArrayWrapper = ({
  className,
  ...props
}: VisualArrayWrapperProps & MotionProps) => {
  return (
    <MergeBaseArrayWrapper
      component={motion.div}
      className={cn(className)}
      {...props}
    />
  );
};
