"use client";

import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { cn } from "@/shared/lib/utils";
import { NODE_SIZE } from "../constants";
import { RefObject, useLayoutEffect, useRef, useState } from "react";
import type { FloatingNodeState } from "../types";

type Pos = { left: number; top: number };

type FloatingNodePortalProps = {
  floatingNode: FloatingNodeState;
  anchorRef: RefObject<HTMLDivElement | null>;
};

const readNodeRect = (nodeId: string): Pos | null => {
  const el = document.querySelector(`[data-node-id="${nodeId}"]`);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { left: r.left, top: r.top };
};

export function FloatingNodePortal({ floatingNode, anchorRef }: FloatingNodePortalProps) {
  const initPosRef = useRef<Pos | null>(null);
  const [animatePos, setAnimatePos] = useState<Pos | null>(null);

  useLayoutEffect(() => {
    const anchorEl = anchorRef.current;
    if (!anchorEl) return;
    const ar = anchorEl.getBoundingClientRect();
    const anchorPos: Pos = { left: ar.left, top: ar.top };

    initPosRef.current =
      (floatingNode.initFromNodeId && readNodeRect(floatingNode.initFromNodeId)) ||
      anchorPos;

    setAnimatePos(anchorPos);
  }, [floatingNode.initFromNodeId, anchorRef]);

  useLayoutEffect(() => {
    if (!floatingNode.animateToNodeId) return;
    const target = readNodeRect(floatingNode.animateToNodeId);
    if (target) setAnimatePos(target);
  }, [floatingNode.animateToNodeId]);

  if (!animatePos || !initPosRef.current) return null;

  return createPortal(
    <motion.div
      className={cn(
        `w-${NODE_SIZE} h-${NODE_SIZE} leading-${NODE_SIZE}`,
        "bg-orange-600 text-center text-white rounded-full",
        "box-border border-orange-400 border-1 pointer-events-none",
      )}
      style={{ position: "fixed", zIndex: 99999 }}
      initial={initPosRef.current}
      animate={animatePos}
      transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
    >
      {floatingNode.value}
    </motion.div>,
    document.body,
  );
}
