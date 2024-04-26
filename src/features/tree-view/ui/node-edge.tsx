import { TreeViewItem } from "@/widgets/binary-tree/model/types";
import { Line } from "./line";
import { NodeItem } from "./node";

type NodeEdgeProps = {
  node: Partial<TreeViewItem> & { active?: boolean };
  shouldAnimate?: boolean;
  isAnimating?: boolean;
  isActive?: boolean;
};

const radius = 20;

const getDotLineByRadius = (r: number) => (r * Math.sqrt(2)) / 2;

const getLineCoords = (
  node: Required<TreeViewItem>,
  parentNode: Required<TreeViewItem>,
  isLeft?: boolean
) => {
  const dotLine = getDotLineByRadius(radius);

  if (isLeft) {
    return {
      x1: parentNode.x - dotLine,
      y1: parentNode.y + dotLine,
      x2: node.x + dotLine,
      y2: node.y - dotLine,
    };
  }

  return {
    x1: parentNode.x + dotLine,
    y1: parentNode.y + dotLine,
    x2: node.x - dotLine,
    y2: node.y - dotLine,
  };
};

const LINE_TRANSITION = 1;

const getNodeAnimationProps = (shouldAnimate?: boolean) =>
  shouldAnimate
    ? {
        initial: { scale: 0 },
        animate: {
          scale: 1,
        },
        transition: {
          type: "spring",
          delay: LINE_TRANSITION,
          duration: LINE_TRANSITION,
        },
      }
    : {};

export const NodeEdge = ({
  node,
  shouldAnimate,
  isAnimating,
  isActive,
}: NodeEdgeProps) => {
  if (shouldAnimate && !isAnimating) return null;
  if (!node.current) return null;
  return (
    <>
      <NodeItem
        key={node.current.id}
        current={node.current}
        x={node.x || 0}
        y={node.y || 0}
        r={radius}
        active={isActive}
        {...getNodeAnimationProps(isActive)}
      />
      {node.parent && (
        <Line
          {...getLineCoords(
            node as Required<TreeViewItem>,
            node.parent as Required<TreeViewItem>,
            node.isLeft
          )}
          transition={{ type: "linear", duration: LINE_TRANSITION }}
        />
      )}
    </>
  );
};
