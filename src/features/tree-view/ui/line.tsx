import { motion, SVGMotionProps } from "framer-motion";

export const Line = ({
  x1,
  y1,
  x2,
  y2,
  ...props
}: SVGMotionProps<SVGLineElement>) => {
  return (
    <motion.line
      initial={{ x2: x1 as number, y2: y1 as number }}
      animate={{ x2: x2 as number, y2: y2 as number }}
      
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      strokeWidth="1"
      markerEnd="url(#arrowHead)"
      className="stroke-black dark:stroke-white"
      {...props}
    />
  );
};

