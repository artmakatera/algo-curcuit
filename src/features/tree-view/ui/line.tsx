"use client";
import { cn } from "@/shared/lib/utils";

import { motion } from "framer-motion";
import { LINE_SIZE } from "../constants";
import { init } from "next/dist/compiled/webpack/webpack";

type LineProps = {
  isLeft?: boolean;
  className?: string;
};

const getAnimationProps = (isLeft?: boolean) => {
  if (isLeft) {
    return {
      initial: {
        x1: "100%",
        y1: 0,
        y2: 0,
      },
      animate: {
        x1: 0,
        y1: "100%",
        y2: 0,
      },
    };
  }
  return {
    initial: {
      x2: 0,
      y2: 0,
    },
    animate: {
      x2: "100%",
      y2: "100%",
    },
  };
};

export const Line = ({ isLeft, className }: LineProps) => {
  return (
    <div className={cn(`absolute h-${LINE_SIZE}  -z-10`, className)}>
      <svg className="w-full h-full">
        <motion.line
          {...getAnimationProps(isLeft)}
          transition={{ duration: 0.8 }}
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
