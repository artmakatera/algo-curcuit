import { cn } from "@/shared/lib/utils";
import { isValidElement } from "react";

export type VisualArrayWrapperProps = {
  children?: React.ReactNode;
  className?: string;
  component?: React.ElementType;
  layout?: boolean;
};

export const VisualArrayWrapper = ({
  children,
  className,
  component: Component = "div",
  ...props
}: VisualArrayWrapperProps) => {
  return (
    <Component
      {...props}
      className={cn(
        "flex items-center mt-12 flex-wrap gap-y-12",
        getItemFontSizeClass(children),
        className
      )}
    >
      {children}
    </Component>
  );
};

function getItemFontSizeClass(children: React.ReactNode) {
  const maxPropLength = getMaxPropValueLength(children);

  if (maxPropLength > 6) {
    return "text-[0.55rem] [&_input]:text-[0.55rem]";
  }
  if (maxPropLength > 4) {
    return "text-[0.65rem] [&_input]:text-[0.65rem]";
  }

  return "text-xs [&_input]:text-xs";
}

function getMaxPropValueLength(children: React.ReactNode): number {
  if (!children) {
    return 0;
  }

  if (!Array.isArray(children)) {
    return isValidElement(children)
      ? (children as { props: { value: number } })?.props?.value || 0
      : 0;
  }

  return children.reduce((acc, child) => {
    if (Array.isArray(child)) {
      return Math.max(acc, getMaxPropValueLength(child));
    }

    if (isValidElement(child)) {
      return Math.max(
        acc,
        String((child as { props: { value: unknown } })?.props?.value || 0)
          .length
      );
    }
    return acc;
  }, 0);
}
