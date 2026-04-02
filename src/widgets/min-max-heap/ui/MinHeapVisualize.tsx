"use client";
import { useCodeLang } from "@/shared/contexts/code-lang";
import { useCallback, useEffect, useRef, useState } from "react";
import { insert, push, pop, peekDraw } from "../model/min-heap";
import { MinMaxHeapControls } from "./MinMaxHeapControls";
import { ActionType, GenValuePayload, StepSnapshot } from "../model/types";

import { useSnapshots } from "@/shared/hooks/use-snapshots";

const heap: number[] = [];

const baseArrayData = [
  20, 6, 40, 8, 27, 55, 1,
  // 10, 30, 35, 60, 5, 9, 11, 29, 31, 45, 70, 4, 7, 28,
  // 33, 42, 65, 75, 3, 32, 34,
];

baseArrayData.forEach((value) => insert(heap, value));

export const MinHeapVisualize = () => {
  const [error, setError] = useState<string | null>(null);
  const [targetValue, setTargetValue] = useState<number>(1);
  const activeTypeRef = useRef<ActionType | null>(null);
  const [baseHeap, setBaseHeap] = useState<number[]>([...heap]);

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
  } = useSnapshots<StepSnapshot, GenValuePayload, [number[], number]>({
    defaultSnapshots: [],
    defaultDelay: "750",
    genCall: genCall,
    genCallArgs: [baseHeap, targetValue],
    createStepSnapshot: (payload: GenValuePayload) => payload,
  });

  const handleAction = useCallback(
    (type: ActionType) => {
      activeTypeRef.current = type;
      const stepsSnapshot = goToLastStep();
      setBaseHeap(stepsSnapshot[stepsSnapshot.length - 1]?.heap || []);
      rebuildSnapshots();
    },
    [goToLastStep, rebuildSnapshots],
  );

  useEffect(() => {
    visualize();
  }, [stepsSnapshot, visualize]);


  return (
    <div>
      <MinMaxHeapControls
        value={targetValue}
        onValueChange={setTargetValue}
        onPeek={() => handleAction(ActionType.peek)}
        onPop={() => handleAction(ActionType.pop)}
        onPush={() => handleAction(ActionType.push)}
      />
    </div>
  );
};
