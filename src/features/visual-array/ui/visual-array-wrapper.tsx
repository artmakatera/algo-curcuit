import { cn } from "@/shared/lib/utils";
import { isValidElement } from "react";

type VisualArrayWrapperProps = {
  children: React.ReactNode;
};

export const VisualArrayWrapper = ({ children }: VisualArrayWrapperProps) => {
  return (
    <div
      className={cn(
        "flex items-center mt-12 flex-wrap gap-y-12",
        getItemFontSizeClass(children)
      )}
    >
      {children}
    </div>
  );
};

function getItemFontSizeClass(children: React.ReactNode) {
  const maxPropLength = getMaxPropValueLength(children);

  let fontSizeClassValue = "xs";

  if (maxPropLength > 4) {
    fontSizeClassValue = "[0.65rem]";
  }

  if (maxPropLength > 6) {
    fontSizeClassValue = "[0.55rem]";
  }

  return `text-${fontSizeClassValue} [&_input]:text-${fontSizeClassValue}`;
}

function getMaxPropValueLength(children: React.ReactNode) {
  if (!children) {
    return 0;
  }

  if (!Array.isArray(children)) {
    return isValidElement(children)
      ? (children as { props: { value: unknown } })?.props?.value
      : 0;
  }

  return children.reduce((acc, child) => {
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
