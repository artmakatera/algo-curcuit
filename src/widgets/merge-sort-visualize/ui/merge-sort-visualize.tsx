"use client";
import { useSnapshots } from "@/shared/hooks/use-snapshots";
import { MergeArrays } from "./merge-arrays";
import { createStepSnapshot, defaultSnapshot, defaultSnapshots } from "../model";
import { VisualizeControls } from "@/features/visualizer-player-controls";
import { mergeSort } from "../model/merge-sort";
import { StepSnapshot } from "../model/types";

export const MergeSortVisualize = () => {
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
  } = useSnapshots<typeof defaultSnapshot, StepSnapshot, [number[]]>({
    defaultDelay: "750",
    defaultSnapshots: defaultSnapshots,
    genCall: mergeSort,
    genCallArgs: [[3, 2, 9, 4, 1, 8]],
    createStepSnapshot: createStepSnapshot,
  });

  const { firstArray, secondArray } = currentSnapshot;

  return (
    <div className="mt-12">
        <VisualizeControls
            onPreviousStep={handlePreviousStep}
            onNextStep={handleNextStep}
            isPlaying={false}
            isResetDisabled={true}
            isPreviousStepDisabled={!hasPrevSnapshot}
            isNextStepDisabled={!hasNextSnapshot}
            speed={delayRef.current}
            onChangeSpeed={onChangeSpeed}
          />
      <MergeArrays
        currentSnapshot={currentSnapshot}

      />

    </div>
  );
};
