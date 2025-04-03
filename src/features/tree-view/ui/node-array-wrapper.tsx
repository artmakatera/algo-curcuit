import { HTMLAttributes } from "react";
import { GAP_SIZE } from "../constants";
import { motion, MotionProps } from "motion/react";
import { cn } from "@/shared/lib/utils";

export type NodeArrayWrapperProps = MotionProps &
  HTMLAttributes<HTMLDivElement> & {
    hasChildren?: boolean;
    index: number;
  };

export const NodeArrayWrapper = ({
  hasChildren,
  index,
  ...props
}: NodeArrayWrapperProps) => {


  return (
    <motion.div
      {...props}
      className={cn(`grid gap-${GAP_SIZE}`)}
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
