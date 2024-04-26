import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Types
import { delay } from "@/shared/lib/utils";
import { BaseSnapshot } from "../types/snapshot";

interface BaseUseGeneratorCallProps<S extends BaseSnapshot, G extends unknown, P extends unknown[]> {
  genCall: (...args: P) => Generator<G, void, unknown>;
  createStepSnapshot: (payload: G) => S;
  genCallArgs: P;
}

interface UseGeneratorCallProps<S extends BaseSnapshot, G extends unknown, P extends unknown[]> extends BaseUseGeneratorCallProps<S, G, P> {
  setStepSnapshots: React.Dispatch<React.SetStateAction<S[]>>;
  setSnapshotIndex: React.Dispatch<React.SetStateAction<number>>;
}


export const useGeneratorCall = <S extends BaseSnapshot, G extends unknown, P extends unknown[]>({
  setStepSnapshots,
  setSnapshotIndex,
  genCall,
  createStepSnapshot,
  genCallArgs
}: UseGeneratorCallProps<S, G, P>
) => {
  const args = JSON.stringify(genCallArgs);

  useEffect(() => {
    const getSnapshots = async (...genCallArgs: P) => {
      let generator = genCall(...genCallArgs);
      const snapshots: G[] = [];

      let next = generator.next();
      while (!next.done) {
        const { value } = next;
        snapshots.push(value as G);
        next = generator.next();
      }
      if (!snapshots.length) return;
      setSnapshotIndex(0);
      setStepSnapshots(snapshots.map(value =>
        createStepSnapshot(value as G),
      ));
    };
    getSnapshots(...JSON.parse(args) as P);


  }, [setStepSnapshots, createStepSnapshot, genCall, args, setSnapshotIndex]);

}


interface UseSnapshotsProps<S extends BaseSnapshot, G extends unknown, P extends unknown[]> extends BaseUseGeneratorCallProps<S, G, P> {
  defaultDelay?: string;
  defaultSnapshots?: S[];
  getGoBackSnapshot?: (snapshot: S) => S;
  autoStart?: boolean;
}


export const useSnapshots = <S extends BaseSnapshot, G extends unknown, P extends unknown[]>(options: UseSnapshotsProps<S, G, P>) => {
  const { defaultDelay = "750", defaultSnapshots = [], genCall, genCallArgs, createStepSnapshot, getGoBackSnapshot, autoStart } = options;
  const delayRef = useRef<string>(defaultDelay);

  const startedRef = useRef<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [stepsSnapshot, setStepSnapshots] = useState<S[]>(defaultSnapshots);
  const [snapshotIndex, setSnapshotIndex] = useState<number>(0);
  const [isGoBack, setIsGoBack] = useState<boolean>(false);


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

  useGeneratorCall({
    setStepSnapshots,
    genCall: genCall,
    createStepSnapshot: createStepSnapshot,
    genCallArgs: genCallArgs,
    setSnapshotIndex

  })

  useEffect(() => {
    if (autoStart) {
      handlePlay()
    }
  }, [autoStart, stepsSnapshot, handlePlay]);


  return {
    startedRef,
    stepsSnapshot,
    setStepSnapshots,
    setSnapshotIndex,
    currentSnapshot,
    highlight,
    hasPrevSnapshot,
    hasNextSnapshot,
    resetSnapshot,
    clearSnapshots,
    handlePreviousStep,
    handleNextStep,
    visualize: handlePlay,
    isPlaying,
    onChangeSpeed,
    delayRef
  };
}
