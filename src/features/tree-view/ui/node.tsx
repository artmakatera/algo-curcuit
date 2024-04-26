import { TreeNode } from "@/widgets/binary-tree/model/binary-tree";
import { SVGMotionProps, motion } from "framer-motion";

type NodeItemProps = {
  current: TreeNode;
  x: number;
  y: number;
  r: number;
  active?: boolean;
};

export const NodeItem = ({
  current,
  x,
  y,
  r,
  active,
  ...props
}: NodeItemProps & SVGMotionProps<SVGGElement>) => {
  return (
    <motion.g {...props}>
      <circle
        cx={x}
        cy={y}
        r={r}
        stroke="black"
        strokeWidth="0"
        className={active ? "fill-blue-500" : "fill-green-600"}
      />
      <text
        x={x}
        y={y || 0 + 5}
        textAnchor="middle"
        className="fill-white font-semibold"
        fontSize="20px"
      >
        {current?.value}
      </text>
    </motion.g>
  );
};

const FILL_CLASSES = {
  default: "fill-green-600",
  active: "fill-yellow-600",
  check: "fill-blue-500",
  remove: "fill-red-600",
};
