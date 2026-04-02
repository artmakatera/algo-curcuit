import { AnimatePresence, LayoutGroup } from "motion/react";
import { NodeArray } from "./node-array";
import { NodeArrayProps } from "../types";
import { SwapProvider } from "../context/swap-context";

export const NodeArrayGroup = (props: NodeArrayProps) => {
  return (
    <SwapProvider>
      <AnimatePresence>
        <NodeArray {...props} />
      </AnimatePresence>
    </SwapProvider>
  );
};
