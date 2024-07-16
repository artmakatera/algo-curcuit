"use client";
import { useCallback, useMemo, useState } from "react";

// Hooks
import { useNumberArray } from "@/shared/hooks/use-number-array";

// Components
import { VisualSortArrayAnimated } from "@/features/visual-sort-array-animated";
import { useSnapshots } from "@/shared/hooks/use-snapshots";
import { defaultSnapshots } from "../model";
import { VisualizeControls } from "@/features/visualizer-player-controls";
import { EditButton } from "@/features/edit-button";
import TypographyH3 from "@/components/ui/typography/typographyH3";
import {
  LANGUAGES,
  StepSnapshot,
  StepSnapshotPayload,
  languagesMapSettings as languagesMapSettingsBase,
  getGoBackSnapshot,
} from "../model";
import { CodeViewers } from "@/components/ui/code-viewers";

const arrToSort = [99, 4, 122, 555, 2, 1, 3, 5, 6, 8];

type BubbleInsertionSortVisualizeProps<S extends StepSnapshot = StepSnapshot> =
  {
    defaultSpeed?: string;
    createStepSnapshotThunk: (
      languagesMapSetting: typeof languagesMapSettingsBase
    ) => (payload: StepSnapshotPayload) => S;
    sort: (arr: number[]) => Generator<StepSnapshotPayload, number[], unknown>;
    languagesMapSettings: typeof languagesMapSettingsBase;
    getIsSorted?: (index: number, sortedIndex: number) => boolean;
  };

export const BubbleInsertionSortVisualize = <S extends StepSnapshot>({
  defaultSpeed = "750",
  createStepSnapshotThunk,
  languagesMapSettings,
  sort,
  getIsSorted,
}: BubbleInsertionSortVisualizeProps<S>) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [codeLang, setCodeLang] = useState(LANGUAGES.javascript);

  const { array, addNumber, removeNumber, updateNumber } =
    useNumberArray(arrToSort);

  const createStepSnapshot = useMemo(
    () => createStepSnapshotThunk(languagesMapSettings),
    [languagesMapSettings, createStepSnapshotThunk]
  );

  const {
    currentSnapshot,
    hasPrevSnapshot,
    hasNextSnapshot,
    rebuildSnapshots: reset,
    handlePreviousStep,
    handleNextStep,
    visualize,
    isPlaying,
    onChangeSpeed,
    delayRef,
  } = useSnapshots<S, StepSnapshotPayload, [number[]]>({
    defaultDelay: defaultSpeed,
    defaultSnapshots: defaultSnapshots as S[],
    genCall: sort as unknown as (
      arr: number[]
    ) => Generator<StepSnapshotPayload, void, unknown>,
    genCallArgs: [[...array]],
    createStepSnapshot,
    getGoBackSnapshot,
  });

  const handlePlay = useCallback(async () => {
    setEditMode(false);
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
          onClick={() => {
            reset();
            setEditMode((prev) => !prev);
          }}
          disabled={isPlaying}
        />
      </div>
      <VisualSortArrayAnimated
        arrToSort={editMode ? array : currentSnapshot.array}
        compareIndexes={currentSnapshot.compareIndexes}
        swapIndexes={currentSnapshot.swapIndexes}
        sortedIndex={currentSnapshot.sortedIndex}
        getIsSorted={getIsSorted}
        editMode={editMode}
        onRemoveNumber={removeNumber}
        onAddNumber={addNumber}
        onUpdateNumber={updateNumber}
      />

      <div className="mt-12">
        <TypographyH3 className="mb-3 font-bold">Code:</TypographyH3>
        <CodeViewers
          langMap={languagesMapSettings}
          language={codeLang}
          onLanguageChange={(lang: string) => setCodeLang(lang as LANGUAGES)}
          step={currentSnapshot.type}
        />
      </div>
    </div>
  );
};
