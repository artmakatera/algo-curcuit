"use client";

import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { cn } from "@/shared/lib/utils";
import { NODE_SIZE } from "../constants";
import { RefObject, useLayoutEffect, useRef, useState } from "react";
import type { FloatingNodeState } from "../types";

type Pos = { left: number; top: number };

type FloatingNodeArrayPortalProps = {
  floatingNodes: FloatingNodeState[] | null | undefined;
  anchorRef: RefObject<HTMLDivElement | null>;
};

const toPagePos = (rect: DOMRect): Pos => ({
  left: rect.left + window.scrollX,
  top: rect.top + window.scrollY,
});

const readNodePagePos = (nodeId: string): Pos | null => {
  const el = document.querySelector(`[data-node-id="${nodeId}"]`);
  if (!el) return null;
  return toPagePos(el.getBoundingClientRect());
};

export function FloatingNodeArrayPortal({
  floatingNodes,
  anchorRef,
}: FloatingNodeArrayPortalProps) {
  const [containerPos, setContainerPos] = useState<Pos | null>(null);

  useLayoutEffect(() => {
    if (containerPos) return;
    if (!floatingNodes || floatingNodes.length === 0) return;
    const el = anchorRef.current;
    if (!el) return;
    setContainerPos(toPagePos(el.getBoundingClientRect()));
  }, [floatingNodes, containerPos, anchorRef]);

  if (!containerPos || !floatingNodes || floatingNodes.length === 0) return null;

  return createPortal(
    <div
      className="pointer-events-none"
      style={{
        position: "absolute",
        left: containerPos.left,
        top: containerPos.top,
        zIndex: 99999,
      }}
    >
      {floatingNodes.map((node) => (
        <FloatingNodeItem
          key={node.key}
          node={node}
          containerPos={containerPos}
        />
      ))}
    </div>,
    document.body,
  );
}

function FloatingNodeItem({
  node,
  containerPos,
}: {
  node: FloatingNodeState;
  containerPos: Pos;
}) {
  const initOffsetRef = useRef<Pos | null>(null);
  const [animateOffset, setAnimateOffset] = useState<Pos | null>(null);

  useLayoutEffect(() => {
    const initPagePos =
      (node.initFromNodeId && readNodePagePos(node.initFromNodeId)) ||
      containerPos;
    initOffsetRef.current = {
      left: initPagePos.left - containerPos.left,
      top: initPagePos.top - containerPos.top,
    };
    setAnimateOffset({ left: 0, top: 0 });
  }, [node.initFromNodeId, containerPos]);

  useLayoutEffect(() => {
    if (!node.animateToNodeId) return;
    const target = readNodePagePos(node.animateToNodeId);
    if (target) {
      setAnimateOffset({
        left: target.left - containerPos.left,
        top: target.top - containerPos.top,
      });
    }
  }, [node.animateToNodeId, containerPos]);

  if (!animateOffset || !initOffsetRef.current) return null;

  return (
    <>
      {node.label && (
        <div
          className="absolute flex flex-col items-center"
          style={{ left: 0, top: 0 }}
        >
          <div
            className={cn(
              `w-${NODE_SIZE} h-${NODE_SIZE} leading-${NODE_SIZE}`,
              "text-center text-orange-600 dark:text-orange-400 rounded-full",
              "box-border border-orange-400 border-1 border-dashed",
            )}
          >
            {node.value}
          </div>
          <div className="text-xs text-muted-foreground uppercase whitespace-nowrap -top-4 -left-0 absolute">
            {node.label}
          </div>
        </div>
      )}
      <motion.div
        className={cn(
          `w-${NODE_SIZE} h-${NODE_SIZE} leading-${NODE_SIZE}`,
          "bg-orange-600 text-center text-white rounded-full",
          "box-border border-orange-400 border-1",
          "absolute",
        )}
        initial={initOffsetRef.current}
        animate={animateOffset}
        transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
      >
        {node.value}
      </motion.div>
    </>
  );
}
