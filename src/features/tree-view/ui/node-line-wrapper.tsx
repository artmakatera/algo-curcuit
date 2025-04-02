import { cn } from "@/shared/lib/utils";
import { motion, MotionProps } from "motion/react";

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
        layout: { duration: 0.15, type: "spring", bounce: 0.5 },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
