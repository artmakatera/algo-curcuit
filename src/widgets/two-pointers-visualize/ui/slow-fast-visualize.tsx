import { CodeViewers } from "@/components/ui/code-viewers";
import { NotFoundTitle } from "@/components/ui/not-found-title";
import TypographyH3 from "@/components/ui/typography/typographyH3";
import { useCodeLang } from "@/shared/contexts/code-lang";
import { useNumberArray } from "@/shared/hooks/use-number-array";
import { useState } from "react";
import { languagesMapSettings } from "../model/fast-slow/languages-map-settings";
import { useSnapshots } from "@/shared/hooks/use-snapshots";
import { GenValuePayload, StepSnapshot } from "../model/types";
import {
  defaultSnapshots,
  createStepSnapshot,
} from "../model/create-step-snapshot";
import { moveZeros } from "../model/fast-slow/fast-slow";
import { VisualizeControls } from "@/features/visualizer-player-controls/ui/visualizer-player-controls";
import { EditButton } from "@/features/edit-button/ui/edit-button";
import { STEPS } from "../model/constants";
import { VisualSortArrayAnimated } from "@/features/visual-sort-array-animated";
import { getGoBackSnapshot } from "../model/get-back-snapshot";

const defaultArray = [0, 1, 3, 0, 5, 7, 0, 12, 0, 18, 20];

export function SlowFastVisualize() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [codeLang, setCodeLang] = useCodeLang();

  const { array, updateNumber, addNumber, removeNumber } =
    useNumberArray(defaultArray);

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
  } = useSnapshots<StepSnapshot, GenValuePayload, [number[]]>({
    defaultDelay: "750",
    defaultSnapshots: defaultSnapshots,
    genCall: moveZeros as unknown as (
      ...args: [number[]]
    ) => Generator<GenValuePayload, void, unknown>,
    genCallArgs: [array],
    createStepSnapshot: createStepSnapshot,
    getGoBackSnapshot: getGoBackSnapshot
  });

  const handlePlay = () => {
    setEditMode(false);
    visualize();
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between sm:items-end my-8 gap-4">
        <VisualizeControls
          onPlay={handlePlay}
          onReset={reset}
          onPreviousStep={handlePreviousStep}
          onNextStep={handleNextStep}
          isPlaying={isPlaying}
          isPreviousStepDisabled={!hasPrevSnapshot}
          isNextStepDisabled={!hasNextSnapshot}
          speed={delayRef.current}
          onChangeSpeed={onChangeSpeed}
        />
        <div className="flex items-end gap-2 ">
          <EditButton
            editMode={editMode}
            onClick={() => {
              reset();
              setEditMode((prev) => !prev);
            }}
            disabled={isPlaying}
          />
        </div>
      </div>
      <VisualSortArrayAnimated
        arrToSort={editMode ? array : currentSnapshot.result || []}
        compareIndexes={currentSnapshot.compareIndexes}
        swapIndexes={currentSnapshot.swapIndexes || []}
        // sortedIndex={currentSnapshot.sortedIndex}
        editMode={editMode}
        onRemoveNumber={removeNumber}
        onAddNumber={addNumber}
        onUpdateNumber={updateNumber}
        sortedIndex={currentSnapshot.type === STEPS.found ? array.length - 1 : -1}
      />

      <NotFoundTitle show={currentSnapshot.type === STEPS.notFound} />
      <div className="mt-12">
        <TypographyH3 className="m-3 font-bold">Code:</TypographyH3>
        <CodeViewers
          langMap={languagesMapSettings}
          language={codeLang}
          onLanguageChange={setCodeLang}
          step={currentSnapshot.type}
        />
      </div>
    </>
  );
}
