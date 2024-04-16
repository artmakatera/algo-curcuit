"use client";
import { NodeEdge, ArrowMarker, NodeItem } from "@/features/tree-view";
import tree from "../model/binary-tree";
import { useLayoutEffect, useRef, useState } from "react";

const radius = 20;

const getDotLineByRadius = (r: number) => (r * Math.sqrt(2)) / 2;

export const BinaryTree = () => {
  const [treeView, setTreeView] = useState<any[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const width = ref.current.clientWidth;

    setTreeView(tree.getTreeView());
  }, []);
  const { minX, minY, maxX, maxY } = treeView.reduce(
    (acc, node) => {
      if (node.x < acc.minX) acc.minX = node.x;
      if (node.x > acc.maxX) acc.maxX = node.x;
      if (node.y < acc.minY) acc.minY = node.y;
      if (node.y > acc.maxY) acc.maxY = node.y;

      return acc;
    },
    { minX: Infinity, minY: Infinity, maxX: 0, maxY: 0 }
  );

  console.log({ minX, minY, maxX, maxY });

  const viewBox = `${minX - radius} ${minY - radius} ${maxX + radius} ${
    maxY + radius
  }`;
  console.log(viewBox);

  return (
    <div
      ref={ref}
      className="max-w-7xl flex min-h-screen flex-col gap-8 items-center p-2 xl:p-24 lg-p-8 md:p-4  mx-auto"
    >
      <h1>Binary Search Tree</h1>

      <svg
        width="100%"
        viewBox="0 0 1226 700"
        // viewBox={viewBox}
        className="bg-white aspect-video"
      >
        <ArrowMarker />
        <g>
          {treeView.map((node) => (
            <NodeEdge key={node.value} node={node} />
          ))}
        </g>
      </svg>
    </div>
  );
};
