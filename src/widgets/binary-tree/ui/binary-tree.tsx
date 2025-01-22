"use client";
import { BinaryTreeDraw, TreeNode } from "../model/binary-tree";
import { useEffect, useMemo, useRef, useState } from "react";
import { TypographyH1 } from "@/components/ui/typography";
import { Controls } from "./controls";
import { ActionType, Dispatch, GenValuePayload } from "../model/types";
import {
  createStepSnapshot,
  defaultSnapshot,
} from "../model/create-step-snapshot";
import { useSnapshots } from "@/shared/hooks/use-snapshots";
import { NodeArray } from "@/features/tree-view/ui/node-array";
import { languagesMapSettings } from "../model/languages-map-settings";
import { LANGUAGES, STEPS } from "../model/constants";
import { NotFoundTitle } from "@/components/ui/not-found-title";
import { NodeToRemoveProvider } from "../../../features/tree-view/context/node-to-remove-context";
import { VisualizeControls } from "@/features/visualizer-player-controls";
import { useCodeLang } from "@/shared/contexts/code-lang";

import {
  getIsRemoveSingleChild,
  getPreventNodeEdgeAnimation,
} from "../model/snapshot-helpers";
import { CodeViewers } from "@/components/ui/code-viewers";
import { TraverseDataView } from "@/features/traverse-data-view";

const tree = new BinaryTreeDraw();

const baseArrayData = [
  20, 6, 40, 8, 27, 55, 1,
  // 10, 30, 35, 60, 5, 9, 11, 29, 31, 45, 70, 4, 7, 28,
  // 33, 42, 65, 75, 3, 32, 34,
];

baseArrayData.forEach((value) => tree.insert(value));

export const BinaryTree = () => {
  const [error, setError] = useState<string | null>(null);
  const [targetValue, setTargetValue] = useState<number | null>(null);
  const [activeType, setActiveType] = useState<ActionType | null>(null);
  const [codeLang, setCodeLang] = useCodeLang();

  const hasCodeLang = codeLang && activeType;

  const ref = useRef<HTMLDivElement>(null);

  const genCall = useMemo(() => {
    if (activeType === "bfs") {
      return tree.bfs as unknown as () => Generator<
        GenValuePayload,
        void,
        unknown
      >;
    }

    if (activeType === "insert") {
      return tree.insertDraw as unknown as (
        v: number | null
      ) => Generator<GenValuePayload, void, unknown>;
    }

    if (activeType === "delete") {
      return tree.removeDraw as unknown as (
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
    hasPrevSnapshot,
    hasNextSnapshot,
    handlePreviousStep,
    handleNextStep,
    goToLastStep,
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
    setError(null);
    setTargetValue(value);
    setActiveType((activeType) =>
      activeType === type && canClose ? null : type
    );
  };

  const onSubmitValue = (value: number) => {
    if (activeType === "insert" && tree.isValueExisted(value)) {
      setError("Value already exists");
      return;
    }
    goToLastStep();
    rebuildSnapshots();
  };

  useEffect(() => {
    visualize();
  }, [stepsSnapshot, visualize]);


  return (
    <div ref={ref} className=" items-center p-2 md:p-4 mx-auto">
      <TypographyH1 className="w-max text-center m-auto">
        Binary Search Tree
      </TypographyH1>
      <div className="flex justify-center items-start mt-8 gap-4">
        <Controls
          dispatch={dispatch}
          disabled={isPlaying}
          activeType={activeType}
          onSubmitValue={onSubmitValue}
        />
        {activeType && (
          <div className="hidden sm:block">
            <VisualizeControls
              onPreviousStep={handlePreviousStep}
              onNextStep={handleNextStep}
              isPlaying={isPlaying}
              isResetDisabled={isPlaying}
              isPreviousStepDisabled={!hasPrevSnapshot}
              isNextStepDisabled={!hasNextSnapshot}
              speed={delayRef.current}
              onChangeSpeed={onChangeSpeed}
            />
          </div>
        )}
      </div>

      {error && (
        <p className="text-center text-red-600 font-bold mt-2">{error}</p>
      )}
      <NotFoundTitle show={currentSnapshot.type === STEPS.notFound} />

      <div className="m-auto container mt-4 w-72 lg:w-96">
        {!!currentSnapshot.queue && !!currentSnapshot.result && (
          <TraverseDataView
            queue={currentSnapshot.queue}
            result={currentSnapshot.result}
            currentNode={currentSnapshot.node}
          />
        )}
      </div>
      <div className="m-auto w-fit mt-4">
        <NodeToRemoveProvider nodeToRemove={currentSnapshot.nodeToRemove}>
          <NodeArray
            parentKey={null}
            groups={currentSnapshot.treeView}
            activeNode={currentSnapshot.node}
            insertedNode={currentSnapshot.insertedNode}
            nodeToRemove={currentSnapshot.nodeToRemove}
            minValueNode={currentSnapshot.minValueNode}
            resultNodes={currentSnapshot.result}
            queueNodes={currentSnapshot.queue}
            durationMs={delayRef.current ? parseInt(delayRef.current) : 750}
            isRemoveSingleChild={getIsRemoveSingleChild(currentSnapshot.type)}
            isMinValueFirstRightChild={
              currentSnapshot.type === STEPS.minValueFirstRightChild
            }
            preventNodeEdgeAnimation={getPreventNodeEdgeAnimation(
              currentSnapshot.type
            )}
            foundNode={
              currentSnapshot.type === STEPS.foundNode
                ? currentSnapshot.node
                : null
            }
          />
        </NodeToRemoveProvider>
      </div>
      {hasCodeLang && (
        <div className="m-auto max-w-2xl mt-4 hidden sm:block">
          <CodeViewers
            langMap={languagesMapSettings[activeType] as any}
            language={codeLang}
            onLanguageChange={(lang: string) => setCodeLang(lang as LANGUAGES)}
            step={currentSnapshot.type}
          />
        </div>
      )}
    </div>
  );
};
