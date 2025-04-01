import { cn } from "@/shared/lib/utils";

import {
  VisualArrayWrapper,
  VisualArrayWrapperProps,
} from "@/features/visual-array";
import { motion } from "motion/react";

export const MergeBaseArrayWrapper = ({
  children,
  className,
  ...props
}: VisualArrayWrapperProps) => {
  return (
    <VisualArrayWrapper
      component={motion.div}
      layout
      className={cn(
        "min-w-12 ",
        "min-h-12 w-max mt-0 p-2 rounded box-content bg-stone-300/35 shadow-xs",
        className
      )}
      {...props}
    >
      {children}
    </VisualArrayWrapper>
  );
};
