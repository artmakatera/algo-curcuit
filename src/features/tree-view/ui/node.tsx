import { TreeNode } from "@/widgets/binary-tree/model/binary-tree";
import { ForwardedRef, forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { NODE_SIZE } from "../constants";

type NodeItemProps = {
  current: TreeNode;
  active?: boolean;
};

export const Node = forwardRef(
  ({ current, active }: NodeItemProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <motion.div
        className={cn(
          "leading-10",
          `w-${NODE_SIZE} h-${NODE_SIZE} leading-${NODE_SIZE}`,
          "bg-green-600  text-center  text-white rounded-full",
          active && "bg-blue-600"
        )}
        ref={ref}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          duration: current.value === 60 ? 0.8 : 0.3,
          delay: current.value === 60 ? 0.5 : 0,
        }}
      >
        {current?.value}
      </motion.div>
    );
  }
);

Node.displayName = "Node";
