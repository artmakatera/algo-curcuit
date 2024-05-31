import { TreeNode } from "@/widgets/binary-tree/model/binary-tree";
import { RefObject, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { NODE_SIZE } from "../constants";
import { useNodeToRemove } from "../context/node-to-remove-context";

type NodeItemProps = {
  current: TreeNode;
  active?: boolean;
  inserted?: boolean;
  found?: boolean;
  isNodeToRemove?: boolean;
  isMinValueNode?: boolean;
  preventAnimation?: boolean;
  hasChildren?: boolean;
};

const getAnimationCoords = (
  ref: RefObject<HTMLDivElement>,
  targetRef?: RefObject<HTMLDivElement>
) => {
  const targetBoundingBox = targetRef?.current?.getBoundingClientRect();
  if (!ref.current || !targetBoundingBox) {
    return {
      x: 0,
      y: 0,
    };
  }

  const { x, y } = ref.current.getBoundingClientRect();
  const targetX = targetBoundingBox.x - x;
  const targetY = targetBoundingBox.y - y;

  return {
    x: targetX,
    y: targetY,
  };
};

export const Node = ({
  hasChildren,
  current,
  active,
  inserted,
  found,
  isNodeToRemove,
  isMinValueNode,
  preventAnimation,
}: NodeItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { nodeToRemove, setNodeToRemove } = useNodeToRemove();

  useEffect(() => {
    if (isNodeToRemove && ref.current) {
      setNodeToRemove(ref);
    }
  }, [setNodeToRemove, isNodeToRemove]);

  const { x, y } = getAnimationCoords(ref, nodeToRemove);

  const getAnimateType = () => {
    if (isMinValueNode) return "minVal";

    return "normal";
  };

  return (
    <motion.div
      animate={isMinValueNode ? "minVal" : "normal"}
      exit={"exit"}
      variants={{
        minVal: {
          x,
          y,
          transition: {
            duration: preventAnimation ? 0 : 0.2,
          },
        },
        exit: {
          opacity: 0,
          transition: {
            duration: 0,
          },
        },
      }}
    >
      <motion.div
        className={cn(
          "leading-10",
          `w-${NODE_SIZE} h-${NODE_SIZE} leading-${NODE_SIZE}`,
          "bg-green-600  text-center  text-white rounded-full",
          active && "bg-blue-600",
          found && "bg-yellow-500 scale-50",
          inserted && "bg-orange-600",
          isNodeToRemove && "bg-red-600"
        )}
        ref={ref}
        initial={{ scale: preventAnimation ? 1 : 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          duration: inserted ? 0.8 : 0.3,
          delay: inserted ? 0.5 : 0,
        }}
      >
        {current?.value}
      </motion.div>
    </motion.div>
  );
};

Node.displayName = "Node";
