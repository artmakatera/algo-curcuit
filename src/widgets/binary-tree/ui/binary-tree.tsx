"use client";
import { BinaryTreeDraw } from "../model/binary-tree";
import { useEffect, useMemo, useState } from "react";
import { Controls } from "./controls";
import { ActionType, Dispatch, GenValuePayload } from "../model/types";
import {
  createStepSnapshot,
  defaultSnapshot,
} from "../model/create-step-snapshot";
import { useSnapshots } from "@/shared/hooks/use-snapshots";
import { languagesMapSettings } from "../model/languages-map-settings";
import { LANGUAGES, STEPS } from "../model/constants";
import { NotFoundTitle } from "@/components/ui/not-found-title";
import { NodeToRemoveProvider } from "../../../features/tree-view/context/node-to-remove-context";
import { useCodeLang } from "@/shared/contexts/code-lang";

import {
  getIsRemoveSingleChild,
  getPreventNodeEdgeAnimation,
} from "../model/snapshot-helpers";
import { CodeViewers } from "@/components/ui/code-viewers";
import { NodeArrayGroup } from "@/features/tree-view";
import { debounce } from "@/shared/lib/debounce";

const tree = new BinaryTreeDraw();

const baseArrayData = [
  20, 6, 40, 8, 27, 55, 1,
  // 10, 30, 35, 60, 5, 9, 11, 29, 31, 45, 70, 4, 7, 28,
  // 33, 42, 65, 75, 3, 32, 34,
];

baseArrayData.forEach((value) => tree.insert(value));

export const BinaryTree = () => {
  const [error, setError] = useState<string | null>(null);
  const [targetValue, setTargetValue] = useState<number | null>(1);
  const [activeType, setActiveType] = useState<ActionType | null>(null);
  const [codeLang, setCodeLang] = useCodeLang();

  const hasCodeLang = codeLang && activeType;
  const isResultReversed = activeType === ActionType.inOrder;

  const genCall = useMemo(() => {
    if (activeType === ActionType.inOrder) {
      return tree.inOrder as unknown as () => Generator<
        GenValuePayload,
        void,
        unknown
      >;
    }
    if (activeType === ActionType.bfs) {
      return tree.bfs as unknown as () => Generator<
        GenValuePayload,
        void,
        unknown
      >;
    }

    if (activeType === ActionType.dfs) {
      return tree.dfs as unknown as () => Generator<
        GenValuePayload,
        void,
        unknown
      >;
    }

    if (activeType === ActionType.insert) {
      return tree.insertDraw as unknown as (
        v: number | null
      ) => Generator<GenValuePayload, void, unknown>;
    }

    if (activeType === ActionType.delete) {
      return tree.removeDraw as unknown as (
        v: number | null
      ) => Generator<GenValuePayload, void, unknown>;
    }

    if (activeType === ActionType.find) {
      return tree.findDraw as unknown as (
        v: number | null
      ) => Generator<GenValuePayload, void, unknown>;
    }

    return () => (function* () {})();
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
    clearSnapshots,
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
    clearSnapshots();
  };

  const onSubmitValue = useMemo(
    () =>
      debounce((value: number) => {
        if (activeType === "insert" && tree.isValueExisted(value)) {
          setError("Value already exists");
          return;
        }
        goToLastStep();
        rebuildSnapshots();
      }, 400),
    [activeType, goToLastStep, rebuildSnapshots]
  );

  useEffect(() => {
    visualize();
  }, [stepsSnapshot, visualize]);

  return (
    <>
      <div className="flex justify-center items-start mt-8 gap-4">
        <Controls
          dispatch={dispatch}
          disabled={isPlaying}
          activeType={activeType}
          onSubmitValue={onSubmitValue}
          onPreviousStep={handlePreviousStep}
          onNextStep={handleNextStep}
          hasPrevSnapshot={hasPrevSnapshot}
          hasNextSnapshot={hasNextSnapshot}
          isPlaying={isPlaying}
          isResetDisabled={stepsSnapshot.length === 0}
          speed={delayRef.current || "750"}
          onChangeSpeed={onChangeSpeed}
        />
      </div>

      {error && (
        <p className="text-center text-red-600 font-bold mt-2">{error}</p>
      )}
      <NotFoundTitle show={currentSnapshot.type === STEPS.notFound} />
      <div className="max-w-screen overflow-x-auto mt-4">
        <div className="m-auto w-fit">
          <NodeToRemoveProvider nodeToRemove={currentSnapshot.nodeToRemove}>
            <NodeArrayGroup
              activeType={activeType}
              parentKey={null}
              groups={currentSnapshot.treeView}
              activeNode={activeType === null ? null : currentSnapshot.node}
              insertedNode={currentSnapshot.insertedNode}
              nodeToRemove={currentSnapshot.nodeToRemove}
              minValueNode={currentSnapshot.minValueNode}
              resultNodes={currentSnapshot.result}
              queueNodes={currentSnapshot.queue}
              durationMs={delayRef.current ? parseInt(delayRef.current) : 750}
              isRemoveSingleChild={getIsRemoveSingleChild(currentSnapshot.type)}
              isResultReversed={isResultReversed}
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
              stackNodes={currentSnapshot.stack}
            />
          </NodeToRemoveProvider>
        </div>
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
    </>
  );
};
