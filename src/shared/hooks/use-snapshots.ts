import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Types
import { delay } from "@/shared/lib/utils";
import { BaseSnapshot } from "../types/snapshot";

interface BaseUseGeneratorCallProps<S extends BaseSnapshot, G extends unknown, P extends unknown[]> {
  genCall: (...args: P) => Generator<G, void, unknown>;
  createStepSnapshot: (payload: G) => S;
}

interface UseGeneratorCallProps<S extends BaseSnapshot, G extends unknown, P extends unknown[]> extends BaseUseGeneratorCallProps<S, G, P> {
}


export const useGeneratorCall = <S extends BaseSnapshot, G extends unknown, P extends unknown[]>({
  genCall,
  createStepSnapshot,
}: UseGeneratorCallProps<S, G, P>
) => {

  const getSnapshots = useCallback((...genCallArgs: P) => {

    let generator = genCall(...genCallArgs);
    const snapshots: G[] = [];

    let next = generator.next();
    while (!next.done) {
      const { value } = next;
      snapshots.push(value as G);
      next = generator.next();
    }
    if (!snapshots.length) return;
    return snapshots.map(value =>
      createStepSnapshot(value as G),
    )
  }, [genCall, createStepSnapshot,]);


  return getSnapshots
}

interface UseSnapshotsProps<S extends BaseSnapshot, G extends unknown, P extends unknown[]> extends BaseUseGeneratorCallProps<S, G, P> {
  defaultDelay?: string;
  defaultSnapshots?: S[];
  getGoBackSnapshot?: (snapshot: S) => S;
  genCallArgs: P;
  createStepSnapshot: (payload: G) => S;


}


export const useSnapshots = <S extends BaseSnapshot, G extends unknown, P extends unknown[]>(options: UseSnapshotsProps<S, G, P>) => {
  const { defaultDelay = "750", defaultSnapshots = [], genCall, genCallArgs, createStepSnapshot, getGoBackSnapshot } = options;
  const delayRef = useRef<string>(defaultDelay);

  const createSnapshots = useGeneratorCall({
    genCall: genCall,
    createStepSnapshot: createStepSnapshot,
  })


  const startedRef = useRef<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [stepsSnapshot, setStepSnapshots] = useState<S[]>(() => createSnapshots(...genCallArgs) || defaultSnapshots);
  const [snapshotIndex, setSnapshotIndex] = useState<number>(0);
  const [isGoBack, setIsGoBack] = useState<boolean>(false);

  const updateSnapshots = useCallback(() => {
    setStepSnapshots(createSnapshots(...genCallArgs) || defaultSnapshots);
  }, [createSnapshots, genCallArgs, defaultSnapshots]);


  const currentSnapshot = useMemo(() => {
    const currentSnapshot = stepsSnapshot[snapshotIndex] || {} as S;

    if (isGoBack && typeof getGoBackSnapshot === "function") {
      return getGoBackSnapshot(currentSnapshot as S);
    }

    return currentSnapshot;
  }, [stepsSnapshot, snapshotIndex, isGoBack, getGoBackSnapshot]);



  const highlight = currentSnapshot?.highlightLines?.join(", ") || "";

  const hasPrevSnapshot = snapshotIndex > 0;
  const hasNextSnapshot = !!stepsSnapshot[snapshotIndex + 1];



  const resetSnapshot = useCallback(() => {
    setIsGoBack(false);
    setSnapshotIndex(0);
  }, []);

  const rebuildSnapshots = useCallback(() => {
    resetSnapshot();
    updateSnapshots();
  }, [updateSnapshots, resetSnapshot]);

  const clearSnapshots = useCallback(() => {
    setIsGoBack(false);
    setStepSnapshots(defaultSnapshots);
    resetSnapshot();
  }, [resetSnapshot, defaultSnapshots]);

  const handlePreviousStep = useCallback(() => {
    setIsGoBack(true);
    setSnapshotIndex((prev: number) => prev - 1);
  }, []);
  const handleNextStep = useCallback(() => {
    setIsGoBack(false);
    setSnapshotIndex((prev: number) => prev + 1);
  }, []);

  const visualize = useCallback(async () => {
    resetSnapshot();

    for (let i = 0; i < stepsSnapshot.length; i++) {
      if (startedRef.current === false) {
        break;
      }
      setSnapshotIndex(i);
      await delay(+delayRef.current);
    }


  }, [stepsSnapshot, setSnapshotIndex, resetSnapshot]);

  const setStarted = useCallback((value: boolean) => {
    startedRef.current = value;
    setIsPlaying(value);
  }, []);


  const handlePlay = useCallback(async () => {
    console.log("handlePlay", startedRef.current);
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
    setSnapshotIndex,
    currentSnapshot,
    highlight,
    hasPrevSnapshot,
    hasNextSnapshot,
    rebuildSnapshots,
    updateSnapshots,
    clearSnapshots,
    handlePreviousStep,
    handleNextStep,
    visualize: handlePlay,
    isPlaying,
    onChangeSpeed,
    createSnapshots,
    delayRef
  };
}
