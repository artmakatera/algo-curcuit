import { Line } from "./line";
import { NodeItem, Node } from "./node";

type NodeEdgeProps = {
  node: Node & { parent?: Node; isLeft?: boolean };
};

const radius = 20;

const getDotLineByRadius = (r: number) => (r * Math.sqrt(2)) / 2;

const getLineCoords = (node: Node, parentNode: Node, isLeft?: boolean) => {
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

export const NodeEdge = ({ node }: NodeEdgeProps) => {
  return (
    <>
      {node.parent && (
        <Line {...getLineCoords(node, node.parent, node.isLeft)} />
      )}
      <NodeItem {...node} r={radius} />
    </>
  );
};
