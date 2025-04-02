import { cn } from "@/shared/lib/utils";
import { AnimatePresence, motion, MotionProps } from "motion/react";
import { b } from "vitest/dist/chunks/suite.d.FvehnV49.js";

interface NodeLineWrapperProps extends MotionProps {
  id: string;
  children: React.ReactNode;
  isLeft?: boolean;
  zIndex?: number;
  isMinNode?: boolean;
}

export function NodeLineWrapper({
  children,
  isLeft,
  isMinNode,
  id,
  zIndex,
  ...props
}: NodeLineWrapperProps) {
  return (
    <motion.div
      layoutId={id}
      className={cn("relative", !isLeft && "grid justify-end")}
      style={{
        gridColumn: isLeft ? "2 / -1" : undefined,
        zIndex: isMinNode ? 9999 : zIndex,
      }}
      transition={{
        layout: { duration: 0.2, type: "tween", ease: "linear", bounce: 0, stiffness: 200},
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
