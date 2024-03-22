"use client";
import { NodeEdge, ArrowMarker, NodeItem } from "@/features/tree-view";
import tree from "../model/binary-tree";
import { useLayoutEffect, useRef, useState } from "react";
import { json } from "stream/consumers";

const radius = 20;

const step = 40;
const height = 4;
const items = Math.pow(2, height);
const width = Math.pow(2, height) * (step + radius);
console.log({ items });

const getDotLineByRadius = (r: number) => (r * Math.sqrt(2)) / 2;
const dotLine = getDotLineByRadius(radius);
export const BinaryTree = () => {
  const [treeView, setTreeView] = useState<any[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const width = ref.current.clientWidth;

    setTreeView(tree.getTreeView((width - radius) / 2));
  }, []);

  return (
    <div
      ref={ref}
      className="flex min-h-screen flex-col gap-8 items-center pt-24"
    >
      <h1>Binary Search Tree</h1>

      <svg width="100%" viewBox="0 0 1450 700" className="bg-white ">
        <ArrowMarker />
        {treeView.map((node) => (
          <NodeEdge key={node.value} node={node} />
        ))}
        {/* {Array.from({ length: items / 8 }, (i, k) => k).map((item) => {
          return (
            <NodeItem
              key={item}
              value={item}
              x={
                ((((width / items) * item + 40) * 4 - radius) * 4 - radius) *
                  8 -
                radius / 2
              }
              y={50}
              r={radius}
            />
          );
        })}
        {Array.from({ length: items / 4 }, (i, k) => k).map((item) => {
          return (
            <NodeItem
              key={item}
              value={item}
              x={((width / items) * item + 40) * 4 - radius / 2}
              y={100}
              r={radius}
            />
          );
        })}
        {Array.from({ length: items / 2 }, (i, k) => k).map((item) => {
          return (
            <NodeItem
              key={item}
              value={item}
              x={((width / items) * item + 40) * 2 - radius / 2}
              y={150}
              r={radius}
            />
          );
        })}
        `
        {Array.from({ length: items }, (i, k) => k).map((item) => {
          return (
            <NodeItem
              key={item}
              value={item}
              x={(width / items) * item + 40}
              y={200}
              r={radius}
            />
          );
        })} */}
      </svg>
    </div>
  );
};
