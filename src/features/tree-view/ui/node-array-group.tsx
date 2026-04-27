import { AnimatePresence } from "motion/react";
import { NodeArray } from "./node-array";
import { NodeArrayProps } from "../types";
import { SwapProvider } from "../context/swap-context";
import { SwapPortal } from "./swap-portal";
import { FloatingNodePortal } from "./floating-node-portal";
import { useRef } from "react";

export const NodeArrayGroup = (props: NodeArrayProps) => {
  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <SwapProvider>
      <div className="relative inline-block">
        {/* Invisible anchor above the tree — used as the "home" position for the floating node portal */}
        <div
          ref={anchorRef}
          className="absolute w-10 h-10 -top-12 left-1/2 -translate-x-1/2 pointer-events-none"
        />
        <AnimatePresence>
          <NodeArray {...props} />
        </AnimatePresence>
      </div>
      <SwapPortal swapAnimations={props.customAnimations?.swap} />
      {props.floatingNodes?.map((floatingNode) => (
        <FloatingNodePortal
          key={floatingNode.key}
          floatingNode={floatingNode}
          anchorRef={anchorRef}
        />
      ))}
    </SwapProvider>
  );
};
