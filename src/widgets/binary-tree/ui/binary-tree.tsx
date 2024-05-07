"use client";
import { BinaryTreeDraw } from "../model/binary-tree";
import { useMemo, useRef, useState } from "react";
import { TypographyH1 } from "@/components/ui/typography";
import { Controls } from "./controls";
import { ActionType, Dispatch, GenValuePayload } from "../model/types";
import {
  createStepSnapshot,
  defaultSnapshots,
  defaultSnapshot,
} from "../model/create-step-snapshot";
import { useSnapshots } from "@/shared/hooks/use-snapshots";
import { NodeArray } from "@/features/tree-view/ui/node-array";

const tree = new BinaryTreeDraw();

const baseArrayData = [20, 6, 35, 8, 27, 55, 1, 3, 25, 29, 60, 54];

baseArrayData.forEach((value) => tree.insert(value));

export const BinaryTree = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [targetValue, setTargetValue] = useState<number | null>(null);
  const [activeType, setActiveType] = useState<ActionType | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  const genCall = useMemo(() => {
    if (activeType === "insert") {
      return tree.insertDraw as unknown as (
        v: number | null
      ) => Generator<GenValuePayload, void, unknown>;
    }
    return tree.findDraw as unknown as (
      v: number | null
    ) => Generator<GenValuePayload, void, unknown>;
  }, [activeType]);

  const {
    currentSnapshot,
    stepsSnapshot,
    highlight,
    hasPrevSnapshot,
    hasNextSnapshot,
    handlePreviousStep,
    handleNextStep,
    visualize,
    isPlaying,
    onChangeSpeed,
    delayRef,
  } = useSnapshots<typeof defaultSnapshot, GenValuePayload, [number | null]>({
    defaultDelay: "750",
    defaultSnapshots: [{ ...defaultSnapshot, treeView: tree.getNodeGroups() }],
    genCall,
    genCallArgs: [targetValue],
    // autoStart: true,
    // @ts-ignore
    createStepSnapshot,
  });

  const dispatch: Dispatch = ({ type, value, canClose }) => {
    setTargetValue(value);
    setActiveType((activeType) =>
      activeType === type && canClose ? null : type
    );
  };

  console.log("value", targetValue);

  const onSubmitValue = () => {
    visualize();
  };

  return (
    <div
      ref={ref}
      className=" flex min-h-screen flex-col gap-8 items-center p-2 md:p-4 mx-auto"
      onClick={() => setIsAnimating((isAnimating) => !isAnimating)}
    >
      <TypographyH1>Binary Search Tree</TypographyH1>
      <Controls
        dispatch={dispatch}
        disabled={isPlaying}
        activeType={activeType}
        onSubmitValue={onSubmitValue}
      />
      <NodeArray
        parentKey={null}
        groups={currentSnapshot.treeView}
        activeNode={currentSnapshot.node}
      />
    </div>
  );
};
