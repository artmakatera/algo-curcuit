import { useCallback, useRef, useState } from "react";

// Types
import { StepSnapshot } from "../model/types";
import { delay } from "@/shared/lib/utils";



export const useSnapshots = (options?: { defaultDelay?: string, defaultSnapshots?: StepSnapshot[] }) => {
  const { defaultDelay = "750", defaultSnapshots = [] } = options || { defaultDelay: "750", defaultSnapshots: [] };
  const delayRef = useRef<string>(defaultDelay);

  const startedRef = useRef<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [stepsSnapshot, setStepSnapshots] = useState<StepSnapshot[]>(defaultSnapshots);
  const [snapshotIndex, setSnapshotIndex] = useState<number>(-1);


  const currentSnapshot = stepsSnapshot[snapshotIndex] || {
    compareIndexes: [-1, -1],
    checkIndex: -1,
    result: -1,
    highlightLines: [],
  };


  const highlight = currentSnapshot.highlightLines.join(", ");

  const hasPrevSnapshot = snapshotIndex > -1;
  const hasNextSnapshot = !!stepsSnapshot[snapshotIndex + 1];

  const resetSnapshotIndex = useCallback(() => {
    setSnapshotIndex(-1);
  }, []);

  const clearSnapshots = useCallback(() => {
    setStepSnapshots([]);
    resetSnapshotIndex();
  }, [resetSnapshotIndex]);

  const handlePreviousStep = useCallback(() => {
    setSnapshotIndex((prev: number) => prev - 1);
  }, []);
  const handleNextStep = useCallback(() => {
    setSnapshotIndex((prev: number) => prev + 1);
  }, []);

  const visualize = useCallback(async () => {
    resetSnapshotIndex();

    for (let i = 0; i < stepsSnapshot.length; i++) {
      if (startedRef.current === false) {
        break;
      }
      setSnapshotIndex(i);
      await delay(+delayRef.current);
    }


  }, [stepsSnapshot, setSnapshotIndex, resetSnapshotIndex]);

  const setStarted = useCallback((value: boolean) => {
    startedRef.current = value;
    setIsPlaying(value);
  }, []);

  const handlePlay = useCallback(async () => {

    if (startedRef.current === true) {
      setStarted(false);
      return;
    }

    setStarted(true);

    await visualize();

    setStarted(false);
  }, [visualize, setStarted]);

  const onChangeSpeed = useCallback((value: string) => {
    delayRef.current = value;
  }, []);


  return {
    startedRef,
    stepsSnapshot,
    setStepSnapshots,
    snapshotIndex,
    setSnapshotIndex,
    currentSnapshot,
    highlight,
    hasPrevSnapshot,
    hasNextSnapshot,
    resetSnapshotIndex,
    clearSnapshots,
    handlePreviousStep,
    handleNextStep,
    visualize: handlePlay,
    isPlaying,
    onChangeSpeed,
    delayRef
  };
}
