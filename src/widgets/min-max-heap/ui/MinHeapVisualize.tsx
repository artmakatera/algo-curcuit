"use client";
import { useCodeLang } from "@/shared/contexts/code-lang";
import { useCallback, useEffect, useRef, useState } from "react";
import { insert, push, pop, peekDraw } from "../model/min-heap";
import { MinMaxHeapControls } from "./MinMaxHeapControls";
import { ActionType, GenValuePayload, StepSnapshot } from "../model/types";

import { useSnapshots } from "@/shared/hooks/use-snapshots";
import { BinaryTreeView } from "./views/binary-tree-view";
import { MODES, STEPS } from "../model/constants";
import { VisualizeControls } from "@/features/visualizer-player-controls";
import { ToggleMenu } from "@/components/ui/toggle-menu";
import { ArrayView } from "./views/array-view";

const baseHeap: number[] = [];

const baseArrayData = [
  20, 6, 40, 8, 27, 55, 10, 30, 35, 60,
  // 10, 30, 35, 60, 5, 9, 11, 29, 31, 45, 70, 4, 7, 28,
  // 33, 42, 65, 75, 3, 32, 34,
];

baseArrayData.forEach((value) => insert(baseHeap, value));

const defaultHeapSnapshot: StepSnapshot[] = [
  {
    heap: baseHeap,
    type: STEPS.endTraverse,
    node: null,
    value: 0,
    index: 0,
    compareIndexes: [],
    swapIndexes: [],
    removeIndex: -1,
  },
];

export const MinHeapVisualize = () => {
  const [error, setError] = useState<string | null>(null);
  const [targetValue, setTargetValue] = useState<number>(1);
  const [viewMode, setViewMode] = useState<"array" | "tree">("tree");
  const activeTypeRef = useRef<ActionType | null>(null);

  const genCall = useCallback(
    (
      baseHeap: number[],
      v: number,
    ): Generator<GenValuePayload, void, unknown> => {
      const activeType = activeTypeRef.current;
      if (activeType === ActionType.push) {
        return push(baseHeap, v);
      }
      if (activeType === ActionType.pop) {
        return pop(baseHeap) as Generator<GenValuePayload, void, unknown>;
      }
      if (activeType === ActionType.peek) {
        return peekDraw(baseHeap);
      }

      return (function* () {})();
    },
    [],
  );

  const {
    currentSnapshot,
    stepsSnapshot,
    hasPrevSnapshot,
    hasNextSnapshot,
    rebuildSnapshots,
    visualize,
    goToLastStep,
    handlePreviousStep,
    handleNextStep,
    isPlaying,
    onChangeSpeed,
    clearSnapshots,
    isGoBack,
    delayRef,
  } = useSnapshots<StepSnapshot, GenValuePayload, [number[], number]>({
    defaultSnapshots: defaultHeapSnapshot,
    defaultDelay: "750",
    genCall: genCall,
    genCallArgs: [baseHeap, targetValue],
    createStepSnapshot: (payload: GenValuePayload) => payload,
  });

  const handleAction = useCallback(
    (type: ActionType) => {
      activeTypeRef.current = type;
      const stepsSnapshot = goToLastStep();
      rebuildSnapshots();
    },
    [goToLastStep, rebuildSnapshots],
  );

  useEffect(() => {
    visualize();
  }, [stepsSnapshot, visualize]);

  return (
    <div >
      <div className="flex mt-8 items-center">
        <MinMaxHeapControls
          value={targetValue}
          onValueChange={setTargetValue}
          onPeek={() => handleAction(ActionType.peek)}
          onPop={() => handleAction(ActionType.pop)}
          onPush={() => handleAction(ActionType.push)}
          disabled={isPlaying}
        />
        <VisualizeControls
          onPreviousStep={handlePreviousStep}
          onNextStep={handleNextStep}
          isPlaying={isPlaying}
          isResetDisabled={stepsSnapshot.length === 0}
          isPreviousStepDisabled={!hasPrevSnapshot}
          isNextStepDisabled={!hasNextSnapshot}
          speed={delayRef.current || "750"}
          onChangeSpeed={onChangeSpeed}
        />
      </div>
      <div className="mt-8">
        <ToggleMenu
          menuItems={MODES}
          value={viewMode}
          onValueChange={(value) => {
            setViewMode(value as "array" | "tree");
          }}
        />
      </div>

      {viewMode === "tree" && (
        <BinaryTreeView
          activeType={activeTypeRef}
          currentSnapshot={currentSnapshot}
          delayRef={delayRef}
        />
      )}
      {viewMode === "array" && (
        <ArrayView
          activeType={activeTypeRef}
          currentSnapshot={currentSnapshot}
          delayRef={delayRef}
          isGoBack={isGoBack}
        />
      )}
    </div>
  );
};
