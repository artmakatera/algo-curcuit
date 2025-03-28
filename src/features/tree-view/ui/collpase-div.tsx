import { HTMLAttributes, useState } from "react";
import { motion, MotionProps } from "framer-motion";

export type CollapseDivProps = MotionProps &
  HTMLAttributes<HTMLDivElement> & {
    hasChildren?: boolean;
    index: number;
  };

export const CollapseDiv = ({
  hasChildren,
  index,
  ...props
}: CollapseDivProps) => {

  const animationProps = {
    exit: hasChildren
      ? {
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
        }
      : {},
    transition: {
      duration: hasChildren ? 4 : 0,
      times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 0.9, 1],
    },
  };
  return (
    <motion.div
      {...animationProps}
      {...props}
      style={{
        gridArea: `item${index + 1}`,
        gridTemplateColumns: "repeat(2, minmax(40px, fit-content(100%)))",
        alignItems: "start",
        gridTemplateAreas: `
                      'header gap'
                      'item1 item2'
                    `,
      }}
    />
  );
};
