"use client";
import { BinaryTreeDraw } from "../model/binary-tree";
import { useEffect, useMemo, useRef, useState } from "react";
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
import { LANGUAGES } from "@/shared/constants/languages";
import { languagesInsertMapSettings } from "../model/languages-map-settings";
import { CodeSection } from "./code-section";

const tree = new BinaryTreeDraw();

const baseArrayData = [20, 6, 35, 8, 27, 55, 1];

baseArrayData.forEach((value) => tree.insert(value));

export const BinaryTree = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [targetValue, setTargetValue] = useState<number | null>(null);
  const [activeType, setActiveType] = useState<ActionType | null>(null);
  const [codeLang] = useState(LANGUAGES.javascript);

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
    rebuildSnapshots,
    visualize,
    isPlaying,
    onChangeSpeed,
    delayRef,
  } = useSnapshots<typeof defaultSnapshot, GenValuePayload, [number | null]>({
    defaultDelay: "750",
    defaultSnapshots: [{ ...defaultSnapshot, treeView: tree.getNodeGroups() }],
    genCall,
    genCallArgs: [targetValue],
    // @ts-ignore
    createStepSnapshot,
  });

  const dispatch: Dispatch = ({ type, value, canClose }) => {
    setTargetValue(value);
    setActiveType((activeType) =>
      activeType === type && canClose ? null : type
    );
  };

  const onSubmitValue = () => {
    rebuildSnapshots();
  };

  useEffect(() => {
    visualize();
  }, [stepsSnapshot, visualize]);

  return (
    <div
      ref={ref}
      className=" flex min-h-[calc(100vh-54px)] flex-col gap-8 items-center p-2 md:p-4 mx-auto"
      onClick={() => setIsAnimating((isAnimating) => !isAnimating)}
    >
      <TypographyH1>Binary Search Tree</TypographyH1>

      <div className="grow">
        <NodeArray
          parentKey={null}
          groups={currentSnapshot.treeView}
          activeNode={currentSnapshot.node}
          insertedNode={currentSnapshot.insertedNode}
        />
      </div>
      <CodeSection
        text={languagesInsertMapSettings[codeLang]?.code}
        highlight={highlight}
      />

      <Controls
        dispatch={dispatch}
        disabled={isPlaying}
        activeType={activeType}
        onSubmitValue={onSubmitValue}
      />
    </div>
  );
};
