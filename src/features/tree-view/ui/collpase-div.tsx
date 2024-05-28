import { HTMLAttributes } from "react";
import { motion, MotionProps } from "framer-motion";

export type CollapseDivProps = MotionProps &
  HTMLAttributes<HTMLDivElement> & {
    preventAnimation?: boolean;
  };

export const CollapseDiv = ({
  preventAnimation,
  ...props
}: CollapseDivProps) => {
  const animationProps = preventAnimation
    ? {}
    : {
        exit: {
          scale: [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0],
          paddingLeft: 0,
          opacity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          overflow: [
            "hidden",
            "hidden",
            "hidden",
            "hidden",
            "hidden",
            "hidden",
            "hidden",
            "hidden",
            "hidden",
            "hidden",
          ],
          width: 0,
        },
        transition: {
          duration: 4,
          times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 0.9, 1],
        },
      };
  return <motion.div {...animationProps} {...props} />;
};
