import { useCallback, useState } from "react";

// Types
import { StepSnapshot } from "../model/types";



export const useSnapshots = () => {
  const [stepsSnapshot, setStepSnapshots] = useState<StepSnapshot[]>([]);
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


  return {
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
  };
}
