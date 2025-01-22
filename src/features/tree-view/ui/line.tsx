"use client";
import { cn } from "@/shared/lib/utils";

import { motion } from "framer-motion";
import { LINE_SIZE } from "../constants";

type LineProps = {
  isLeft?: boolean;
  className?: string;
  preventAnimation?: boolean;
  completed?: boolean;
};

const getAnimationProps = (isLeft?: boolean, preventAnimation?: boolean) => {
  if (preventAnimation) {
    return {};
  }
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
    // exit: {
    //   x2: 0,
    //   y2: 0,
    //   transition: {
    //     duration: 0.1,
    //   },
    // },
  };
};

export const Line = ({ isLeft, className, preventAnimation, completed }: LineProps) => {
  return (
    <div className={cn(`absolute h-${LINE_SIZE} -z-10`, className)}>
      <svg className="w-full h-full">
        <motion.line
          {...getAnimationProps(isLeft, preventAnimation)}
          transition={{ duration: preventAnimation ? 0 : 0.8 }}
          x1={0}
          x2={"100%"}
          y1={isLeft ? "100%" : 0}
          y2={isLeft ? 0 : "100%"}
          className={cn("stroke-black dark:stroke-white", completed && "stroke-orange-600 dark:stroke-orange-600")}
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};
