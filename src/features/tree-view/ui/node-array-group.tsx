import { AnimatePresence, LayoutGroup } from "motion/react";
import { NodeArray } from "./node-array";
import { NodeArrayProps } from "../types";

export const NodeArrayGroup = (props: NodeArrayProps) => {
  return (
      <AnimatePresence>
        <NodeArray {...props} />
      </AnimatePresence>
  );
};
