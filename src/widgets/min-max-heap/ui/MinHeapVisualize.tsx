"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import * as MinHeap from "../model/min-heap";
import * as MaxHeap from "../model/max-heap";
import { MinMaxHeapControls } from "./MinMaxHeapControls";
import { ActionType, GenValuePayload, StepSnapshot } from "../model/types";

import { useSnapshots } from "@/shared/hooks/use-snapshots";
import { BinaryTreeView } from "./views/binary-tree-view";
import { MODES, STEPS, HEAP_TYPES, HeapType } from "../model/constants";
import { VisualizeControls } from "@/features/visualizer-player-controls";
import { ToggleMenu } from "@/components/ui/toggle-menu";
import { ArrayView } from "./views/array-view";
import { CodeViewers } from "@/components/ui/code-viewers";
import { useCodeLang } from "@/shared/contexts/code-lang";
import { LANGUAGES } from "@/shared/constants/languages";
import { languagesMapSettings } from "../model/languages-map-settings";

const baseArrayData = [
  20, 6, 40, 8, 27, 55, 10, 30, 35, 60,
  // 10, 30, 35, 60, 5, 9, 11, 29, 31, 45, 70, 4, 7, 28,
  // 33, 42, 65, 75, 3, 32, 34,
];

const baseHeap: number[] = [];
baseArrayData.forEach((value) => MinHeap.insert(baseHeap, value));

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

function getOps(heapType: HeapType) {
  return heapType === "max" ? MaxHeap : MinHeap;
}

function reseedHeap(heap: number[], heapType: HeapType) {
  heap.length = 0;
  const ops = getOps(heapType);
  baseArrayData.forEach((v) => ops.insert(heap, v));
  
}

export const MinHeapVisualize = () => {
  const [targetValue, setTargetValue] = useState<number>(1);
  const [viewMode, setViewMode] = useState<"array" | "tree">("tree");
  const [heapType, setHeapType] = useState<HeapType>("min");
  const heapTypeRef = useRef<HeapType>("min");
  const activeTypeRef = useRef<ActionType | null>(null);
  const [activeType, setActiveType] = useState<ActionType | null>(null);
  const [codeLang, setCodeLang] = useCodeLang();

  const genCall = useCallback(
    (
      heap: number[],
      v: number,
    ): Generator<GenValuePayload, void, unknown> => {
      const ops = getOps(heapTypeRef.current);
      const activeType = activeTypeRef.current;
      if (activeType === ActionType.push) {
        return ops.push(heap, v);
      }
      if (activeType === ActionType.pop) {
        return ops.pop(heap) as Generator<GenValuePayload, void, unknown>;
      }
      if (activeType === ActionType.peek) {
        return ops.peekDraw(heap);
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
      setActiveType(type);
      goToLastStep();
      rebuildSnapshots();
    },
    [goToLastStep, rebuildSnapshots],
  );

  const handleHeapTypeChange = useCallback(
    (next: HeapType) => {
      if (next === heapTypeRef.current) return;
      heapTypeRef.current = next;
      activeTypeRef.current = ActionType.peek;
      setActiveType(null);
      reseedHeap(baseHeap, next);
      clearSnapshots();
      setHeapType(next);

      rebuildSnapshots();
    },
    [clearSnapshots, rebuildSnapshots],
  );

  useEffect(() => {
    visualize();
  }, [stepsSnapshot, visualize]);

  return (
    <div>
      <div className="mt-8">
        <ToggleMenu
          menuItems={HEAP_TYPES}
          value={heapType}
          onValueChange={(value) => handleHeapTypeChange(value as HeapType)}
        />
      </div>
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

      {activeType && (
        <div className="m-auto mt-4 hidden sm:block">
          <CodeViewers
            langMap={languagesMapSettings[heapType][activeType]}
            language={codeLang}
            onLanguageChange={(lang: string) => setCodeLang(lang as LANGUAGES)}
            step={currentSnapshot.type}
          />
        </div>
      )}
    </div>
  );
};
