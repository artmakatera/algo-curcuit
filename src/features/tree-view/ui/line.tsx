"use client";
import { cn } from "@/shared/lib/utils";

import { motion } from "framer-motion";
import { LINE_SIZE } from "../constants";

type LineProps = {
  isLeft?: boolean;
  className?: string;
};

export const Line = ({ isLeft, className }: LineProps) => {
  return (
    <div className={cn(`absolute h-${LINE_SIZE}  -z-10`, className)}>
      <svg className="w-full h-full">
        <motion.line
          initial={{ x2: 0, y2: isLeft ? "100%" : 0 }}
          animate={{ x2: "100%", y2: isLeft ? 0 : "100%" }}
          // transition={{ type: "linear", duration: durationRef.current }}
          x1={0}
          x2={"100%"}
          y1={isLeft ? "100%" : 0}
          y2={isLeft ? 0 : "100%"}
          className="stroke-black dark:stroke-white"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};
