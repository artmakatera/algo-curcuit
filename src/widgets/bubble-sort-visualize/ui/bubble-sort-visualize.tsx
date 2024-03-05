"use client";
import { useCallback, useEffect, useState } from "react";

// Hooks
import { useNumberArray } from "@/shared/hooks/use-number-array";

// Components
import { VisualSortArrayAnimated } from "@/features/visual-sort-array-animated";
import { StepSnapshot, StepSnapshotPayload } from "../model/types";
import { useSnapshots } from "@/shared/hooks/use-snapshots";
import bubbleSort from "../model/bubble-sort";
import { defaultSnapshots } from "../model/create-step-snapshot";
import { VisualizeControls } from "@/features/visualizer-player-controls";
import { EditButton } from "@/features/edit-button";
import TypographyH3 from "@/components/ui/typography/typographyH3";
import { CodeViewer } from "@/components/ui/code-viewer";
import { languagesMapSettings } from "../model/languages-map-settings";
import { LANGUAGES } from "../model/constants";

const arrToSort = [99, 4, 122, 555, 2, 1, 3, 5, 6, 8];

type BubbleSortVisualizeProps<S extends StepSnapshot = StepSnapshot> = {
  defaultSpeed?: string;
  createStepSnapshot: (payload: StepSnapshotPayload) => S;
};

const BubbleSortVisualize = <S extends StepSnapshot>({
  defaultSpeed = "750",
  createStepSnapshot,
}: BubbleSortVisualizeProps<S>) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [codeLang] = useState(LANGUAGES.javascript);

  const { array, addNumber, removeNumber, updateNumber } =
    useNumberArray(arrToSort);

  const {
    setStepSnapshots,
    currentSnapshot,
    highlight,
    hasPrevSnapshot,
    hasNextSnapshot,
    resetSnapshotIndex: reset,
    handlePreviousStep,
    handleNextStep,
    visualize,
    isPlaying,
    onChangeSpeed,
    delayRef,
  } = useSnapshots<S>({
    defaultDelay: defaultSpeed,
    defaultSnapshots: defaultSnapshots as S[],
  });

  useEffect(() => {
    const bubbleSortCall = async (array: number[]) => {
      setStepSnapshots([]);
      console.log("array", array);
      let generator = bubbleSort([...array]);

      let next = generator.next();
      while (!next.done) {
        const { value } = next;
        setStepSnapshots((prev: S[]) => [
          ...prev,
          createStepSnapshot(value as unknown as StepSnapshotPayload),
        ]);
        next = generator.next();
      }
    };

    bubbleSortCall(array);
  }, [array, setStepSnapshots, createStepSnapshot]);

  const handlePlay = useCallback(async () => {
    // setEditMode(false);
    visualize();
  }, [visualize]);

  return (
    <div className="pt-10">
      <div className="mb-12 flex gap-4">
        <VisualizeControls
          onPlay={handlePlay}
          onReset={reset}
          onPreviousStep={handlePreviousStep}
          onNextStep={handleNextStep}
          isPlaying={isPlaying}
          isResetDisabled={isPlaying}
          isPreviousStepDisabled={!hasPrevSnapshot}
          isNextStepDisabled={!hasNextSnapshot}
          speed={delayRef.current}
          onChangeSpeed={onChangeSpeed}
        />
        <EditButton
          editMode={editMode}
          onClick={() => setEditMode((prev) => !prev)}
          disabled={isPlaying}
        />
      </div>
      <VisualSortArrayAnimated
        arrToSort={currentSnapshot.array}
        compareIndexes={currentSnapshot.compareIndexes}
        swapIndexes={currentSnapshot.swapIndexes}
        sortedIndex={currentSnapshot.sortedIndex}
        getIsSorted={(index: number, sortedIndex: number) =>
          index >= sortedIndex
        }
        editMode={editMode}
        onRemoveNumber={removeNumber}
        onAddNumber={addNumber}
        onUpdateNumber={updateNumber}
      />

      <div className="mt-12">
        <TypographyH3 className="mb-3 font-bold">Code:</TypographyH3>
        <CodeViewer
          text={languagesMapSettings[codeLang]?.code}
          highlight={highlight}
        />
      </div>
    </div>
  );
};

export default BubbleSortVisualize;
