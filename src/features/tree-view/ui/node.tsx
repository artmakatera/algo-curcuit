import { TreeNode } from "@/widgets/binary-tree/model/binary-tree";
import { ForwardedRef, forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { NODE_SIZE } from "../constants";

type NodeItemProps = {
  current: TreeNode;
  active?: boolean;
  inserted?: boolean;
};

export const Node = forwardRef(
  (
    { current, active, inserted }: NodeItemProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <motion.div
        className={cn(
          "leading-10",
          `w-${NODE_SIZE} h-${NODE_SIZE} leading-${NODE_SIZE}`,
          "bg-green-600  text-center  text-white rounded-full",
          active && "bg-blue-600",
          inserted && "bg-orange-600"
        )}
        ref={ref}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          duration: inserted ? 0.8 : 0.3,
          delay: inserted ? 0.5 : 0,
        }}
      >
        {current?.value}
      </motion.div>
    );
  }
);

Node.displayName = "Node";
