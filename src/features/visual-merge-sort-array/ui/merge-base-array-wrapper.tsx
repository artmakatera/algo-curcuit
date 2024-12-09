import { cn } from "@/shared/lib/utils";

import {
  VisualArrayWrapper,
  VisualArrayWrapperProps,
} from "@/features/visual-array";

export const MergeBaseArrayWrapper = ({
  children,
  className,
  ...props
}: VisualArrayWrapperProps) => {
  return (
    <VisualArrayWrapper
      className={cn(
        "min-h-12 w-max mt-0 p-2 rounded box-content  bg-stone-300/35 shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </VisualArrayWrapper>
  );
};
