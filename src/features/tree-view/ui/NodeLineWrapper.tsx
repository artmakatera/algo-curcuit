import { cn } from "@/shared/lib/utils";
import { motion } from "framer-motion";

interface NodeLineWrapperProps {
  children: React.ReactNode;
  isLeft?: boolean;
  zIndex?: number;
}

export function NodeLineWrapper({
  children,
  isLeft,
  zIndex,
}: NodeLineWrapperProps) {
  return (
    <motion.div
      layout
      className={cn("relative", !isLeft && "grid justify-end")}
      style={{
        gridColumn: isLeft ? "2 / -1" : undefined,
        zIndex,
      }}
    >
      {children}
    </motion.div>
  );
}
