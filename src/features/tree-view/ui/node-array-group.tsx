import { AnimatePresence, LayoutGroup } from "motion/react";
import { NodeArray } from "./node-array";
import { NodeArrayProps } from "../types";
import { SwapProvider } from "../context/swap-context";
import { SwapPortal } from "./swap-portal";

export const NodeArrayGroup = (props: NodeArrayProps) => {
  return (
    <SwapProvider>
      <AnimatePresence>
        <NodeArray {...props} />
      </AnimatePresence>
      <SwapPortal swapAnimations={props.customAnimations?.swap} />
    </SwapProvider>
  );
};
