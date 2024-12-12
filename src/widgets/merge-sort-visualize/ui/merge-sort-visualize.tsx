"use client";
import { useSnapshots } from "@/shared/hooks/use-snapshots";
import { MergeArrays } from "./merge-arrays";
import {
  createStepSnapshot,
  defaultSnapshot,
  defaultSnapshots,
} from "../model";
import { VisualizeControls } from "@/features/visualizer-player-controls";
import { mergeSort } from "../model/merge-sort";
import { StepSnapshot } from "../model/types";
import { useNumberArray } from "@/shared/hooks/use-number-array";
import { useCallback, useState } from "react";
import { EditButton } from "@/features/edit-button";

const arrToSort = [3, 2, 9, 4, 1, 8];

export const MergeSortVisualize = () => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const { array, addNumber, removeNumber, updateNumber } =
    useNumberArray(arrToSort);
  const {
    currentSnapshot,
    stepsSnapshot,
    hasPrevSnapshot,
    hasNextSnapshot,
    handlePreviousStep,
    handleNextStep,
    isGoBack,
    rebuildSnapshots,
    visualize,
    isPlaying,
    onChangeSpeed,
    delayRef,
  } = useSnapshots<typeof defaultSnapshot, StepSnapshot, [number[]]>({
    defaultDelay: "750",
    defaultSnapshots: defaultSnapshots,
    genCall: mergeSort,
    genCallArgs: [[...array]],
    createStepSnapshot: createStepSnapshot,
  });

  const handlePlay = useCallback(async () => {
    setEditMode(false);
    visualize();
  }, [visualize]);

  return (
    <div className="mt-12">
      <div className="flex gap-4">
        <VisualizeControls
          onPlay={handlePlay}
          onReset={rebuildSnapshots}
          onPreviousStep={handlePreviousStep}
          onNextStep={handleNextStep}
          isPlaying={isPlaying}
          isResetDisabled={isPlaying}
          isPreviousStepDisabled={!hasPrevSnapshot}
          isNextStepDisabled={!hasNextSnapshot}
          speed={delayRef.current}
          onChangeSpeed={onChangeSpeed}
        />
        {/* <EditButton
          editMode={editMode}
          onClick={() => {
            rebuildSnapshots();
            setEditMode((prev) => !prev);
          }}
          disabled={isPlaying}
        /> */}
      </div>
      <MergeArrays currentSnapshot={currentSnapshot} isGoBack={isGoBack} />
    </div>
  );
};
