import { cn } from "@/shared/lib/utils";

import { VisualArrayWrapperProps } from "@/features/visual-array";
import { MergeBaseArrayWrapper } from "./merge-base-array-wrapper";

export const MergeArrayWrapper = ({
  children,
  className,
}: VisualArrayWrapperProps) => {
  return (
    <MergeBaseArrayWrapper className={cn("shadow-md gap-2", className)}>
      {children}
    </MergeBaseArrayWrapper>
  );
};
