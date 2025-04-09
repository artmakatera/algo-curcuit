import { AnimatePresence, color, motion } from "motion/react";

import { VisualArrayItem, VisualArrayItemProps } from "@/features/visual-array";

const initial = {
  x: -80,
  y: -80,
  rotate: -60,
  opacity: 0,
};

const adding = {
  x: [-80, 0, 0],
  y: [-80, -80, 0],
  opacity: [0, 0.5, 1, 1],
  rotate: [-45, -30, -15, 0],
};

const exit = {
  x: [0, 0, 80],
  y: [0, -80, -80],
  opacity: [1, 1, 0.8, 0],
  backgroundColor: "red",
  color: "white",
  rotate: [0, 15, 30, 45],
};

interface StackAnimatedItemProps extends VisualArrayItemProps {}

export const StackAnimatedItem = ({ ...props }: StackAnimatedItemProps) => {
  return (
    <motion.div
      key={props.index}
      exit={exit}
      initial={initial}
      animate={adding}
      layout
    >
      <VisualArrayItem {...props} />
    </motion.div>
  );
};
