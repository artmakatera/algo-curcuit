"use client";

import { createPortal } from "react-dom";
import { motion, Transition } from "motion/react";
import { cn } from "@/shared/lib/utils";
import { NODE_SIZE } from "../constants";
import { useSwap } from "../context/swap-context";
import type { SwapAnimations } from "../types";

type SwapPortalProps = {
  swapAnimations?: SwapAnimations;
};

export function SwapPortal({ swapAnimations }: SwapPortalProps) {
  const { parentInfo, childInfo } = useSwap();

  if (!parentInfo?.element || !childInfo?.element) return null;

  const parentRect = parentInfo.element.getBoundingClientRect();
  const childRect = childInfo.element.getBoundingClientRect();

  const transition: Transition = swapAnimations?.transition ?? {
    type: "spring",
    duration: swapAnimations?.duration ?? 0.4,
    bounce: 0.15,
  };

  const nodeClasses = cn(
    `w-${NODE_SIZE} h-${NODE_SIZE} leading-${NODE_SIZE}`,
    "bg-violet-600 text-center text-white rounded-full",
    "box-border border-violet-400 border-1 absolute",
  );

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[99999]">
      <motion.div
        className={nodeClasses}
        initial={{ left: parentRect.left, top: parentRect.top }}
        animate={{ left: childRect.left, top: childRect.top }}
        transition={transition}
      >
        {parentInfo.value}
      </motion.div>
      <motion.div
        className={nodeClasses}
        initial={{ left: childRect.left, top: childRect.top }}
        animate={{ left: parentRect.left, top: parentRect.top }}
        transition={transition}
      >
        {childInfo.value}
      </motion.div>
    </div>,
    document.body,
  );
}
