import { TreeNode } from "@/widgets/binary-tree/model/binary-tree";
import { ForwardedRef, forwardRef } from "react";
import { motion } from "framer-motion";

type NodeItemProps = {
  current: TreeNode;
  active?: boolean;
};

export const Node = forwardRef(
  ({ current, active }: NodeItemProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <motion.div
        className="bg-green-600 w-10 h-10 text-center leading-10 text-white rounded-full"
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
