import { useCallback, useRef, useState } from "react";

// Types
import { delay } from "@/shared/lib/utils";
import { BaseSnapshot } from "../types/snapshot";



export const useSnapshots = <S extends BaseSnapshot>(options?: { defaultDelay?: string, defaultSnapshots?: S[] }) => {
  const { defaultDelay = "750", defaultSnapshots = [] } = options || { defaultDelay: "750", defaultSnapshots: [] };
  const delayRef = useRef<string>(defaultDelay);

  const startedRef = useRef<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [stepsSnapshot, setStepSnapshots] = useState<S[]>(defaultSnapshots);
  const [snapshotIndex, setSnapshotIndex] = useState<number>(0);


  const currentSnapshot = stepsSnapshot[snapshotIndex];



  const highlight = currentSnapshot.highlightLines.join(", ");

  const hasPrevSnapshot = snapshotIndex > 0;
  const hasNextSnapshot = !!stepsSnapshot[snapshotIndex + 1];

  const resetSnapshotIndex = useCallback(() => {
    setSnapshotIndex(0);
  }, []);

  const clearSnapshots = useCallback(() => {
    setStepSnapshots(defaultSnapshots);
    resetSnapshotIndex();
  }, [resetSnapshotIndex, defaultSnapshots]);

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
