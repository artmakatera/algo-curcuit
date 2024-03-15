import { NodeEdge, ArrowMarker } from "@/features/tree-view";
import tree from "../model/binary-tree";

const radius = 20;

const getDotLineByRadius = (r: number) => (r * Math.sqrt(2)) / 2;
const dotLine = getDotLineByRadius(radius);
export const BinaryTree = () => {
  console.log(tree.getTreeView());

  return (
    <div className="flex min-h-screen flex-col gap-8 items-center p-24">
      <h1>Binary Search Tree</h1>

      <svg width="800px" height="800px" className="bg-white">
        <ArrowMarker />
        {tree.getTreeView().map((node) => (
          <NodeEdge key={node.value} node={node} />
        ))}

        {/* <NodeEdge node={{ value: 2, x: 400, y: 50 }} />
        <NodeEdge node={{ value: 1, x: 350, y: 120 }} parentNode={{ value: 2, x: 400, y: 50 }} isLeft />
        <NodeEdge node={{ value: 3, x: 450, y: 120 }} parentNode={{ value: 2, x: 400, y: 50 }} />
         */}
      </svg>
    </div>
  );
};


