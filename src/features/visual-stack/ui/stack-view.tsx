import { StackWrapper } from "./stack-wrapper";
import { StackAnimatedItem } from "./stack-animated-item";
import { AnimatePresence } from "motion/react";

interface StackViewProps {
  array: number[];
  showPeek?: boolean;
}

export const StackView = ({ array, showPeek }: StackViewProps) => {
  return (
    <StackWrapper>
      <AnimatePresence>
        {array.map((value, index, arr) => (
          <StackAnimatedItem
            key={index}
            value={value}
            index={index}
            isComparing={index === arr.length - 1 && showPeek}
          />
        ))}
      </AnimatePresence>
    </StackWrapper>
  );
};
