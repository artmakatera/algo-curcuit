"use client";
import { NodeEdge, ArrowMarker, NodeItem } from "@/features/tree-view";
import { BinaryTreeDraw } from "../model/binary-tree";
import { useLayoutEffect, useRef, useState } from "react";
import { TypographyH1 } from "@/components/ui/typography";
import { Controls } from "./controls";
import { Dispatch, GenValuePayload } from "../model/types";
import {
  createStepSnapshot,
  defaultSnapshots,
  defaultSnapshot,
} from "../model/create-step-snapshot";
import { useSnapshots } from "@/shared/hooks/use-snapshots";

const tree = new BinaryTreeDraw();

const baseArrayData = [20, 6, 35, 8, 27, 55, 1, 3, 25, 29, 60, 54];

baseArrayData.forEach((value) => tree.insert(value));

export const BinaryTree = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [targetValue, setTargetValue] = useState<number | null>(null);
  const [actionType, setActionType] = useState<
    "insert" | "delete" | "find" | null
  >(null);

  const ref = useRef<HTMLDivElement>(null);

  const {
    currentSnapshot,
    stepsSnapshot,
    highlight,
    hasPrevSnapshot,
    hasNextSnapshot,
    resetSnapshot: reset,
    handlePreviousStep,
    handleNextStep,
    visualize,
    isPlaying,
    onChangeSpeed,
    delayRef,
  } = useSnapshots<typeof defaultSnapshot, GenValuePayload, [number | null]>({
    defaultDelay: "750",
    defaultSnapshots: [{ ...defaultSnapshot, treeView: tree.getTreeView() }],
    genCall: tree.insertDraw as unknown as (
      v: number | null
    ) => Generator<GenValuePayload, void, unknown>,
    genCallArgs: [targetValue],
    autoStart: true,
    // @ts-ignore
    createStepSnapshot,
  });

  const dispatch: Dispatch = ({ type, value }) => {
    setTargetValue(value);
    setActionType(type);
  };

  console.log(currentSnapshot, stepsSnapshot);

  return (
    <div
      ref={ref}
      className=" flex min-h-screen flex-col gap-8 items-center p-2 md:p-4 mx-auto"
      onClick={() => setIsAnimating((isAnimating) => !isAnimating)}
    >
      <TypographyH1>Binary Search Tree</TypographyH1>
      <Controls dispatch={dispatch} disabled={isPlaying} />
      <svg className="w-full h-screen" viewBox="200 0 500 2550">
        <ArrowMarker />
        <g>
          {currentSnapshot.treeView.map((node) => {
            const isActive = node.current?.id === currentSnapshot?.node?.id;
            return (
              <NodeEdge
                key={node.current?.id}
                node={node}
                isActive={isActive}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};
