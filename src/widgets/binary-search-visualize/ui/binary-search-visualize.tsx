"use client";
import { useCallback, useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";

// Constants
import { STEPS } from "../model/constants";

// Hooks
import { useNumberArray } from "@/shared/hooks/use-number-array";
import { useSnapshots } from "@/shared/hooks/use-snapshots";
import { useCodeLang } from "@/shared/contexts/code-lang";

// Helpers
import { binarySearch } from "../model/binary-search";
import { defaultSnapshots } from "../model";
import { languagesBSMapSettings } from "../model/binary-search/languages-map-settings";

// Types
import { GenValuePayload, StepSnapshot } from "../model/types";

// Components
import { VisualizeControls } from "@/features/visualizer-player-controls";
import { VisualArrayItem, VisualArrayWrapper } from "@/features/visual-array";
import { Button } from "@/components/ui/button";
import { TargetInput } from "@/components/ui/target-input";
import EditArrayItem from "@/features/visual-array/ui/edit-array-item";
import TypographyH3 from "@/components/ui/typography/typographyH3";
import { EditButton } from "@/features/edit-button";
import { NotFoundTitle } from "@/components/ui/not-found-title";
import { CodeViewers } from "@/components/ui/code-viewers";

type BinarySearchVisualizeProps<S extends StepSnapshot> = {
  defaultArray: number[];
  defaultSpeed?: string;
  createStepSnapshot: (payload: GenValuePayload) => S;
  languagesMapSettings?: typeof languagesBSMapSettings;
  binarySearchFind?: typeof binarySearch;
};

export const BinarySearchVisualize = <S extends StepSnapshot>({
  defaultArray,
  defaultSpeed = "750",
  createStepSnapshot,
  languagesMapSettings = languagesBSMapSettings,
  binarySearchFind = binarySearch,
}: BinarySearchVisualizeProps<S>) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [target, setTarget] = useState<number | null>(12);
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
  } = useSnapshots<S, GenValuePayload, [number[], number]>({
    defaultDelay: defaultSpeed,
    defaultSnapshots: defaultSnapshots as S[],
    genCall: binarySearchFind as unknown as (
      ...args: [number[], number]
    ) => Generator<GenValuePayload, void, unknown>,
    genCallArgs: [array, target || 0],
    createStepSnapshot,
  });

  const handlePlay = useCallback(async () => {
    setEditMode(false);
    visualize();
  }, [visualize]);

  const updateTarget = useCallback((value: string) => {
    setTarget(value === "" ? null : +value);
  }, []);

  return (
    <div>
      <div>
        <div className="flex flex-col sm:flex-row justify-between sm:items-end my-8 gap-4">
          <VisualizeControls
            onPlay={handlePlay}
            onReset={reset}
            onPreviousStep={handlePreviousStep}
            onNextStep={handleNextStep}
            isPlaying={isPlaying}
            isResetDisabled={currentSnapshot.checkIndex !== -1}
            isPreviousStepDisabled={!hasPrevSnapshot}
            isNextStepDisabled={!hasNextSnapshot}
            speed={delayRef.current}
            onChangeSpeed={onChangeSpeed}
          />
          <div className="flex items-end gap-2 ">
            <TargetInput
              value={target || ""}
              onChange={updateTarget}
              disabled={!editMode}
            />

            <EditButton
              editMode={editMode}
              onClick={() => {
                reset();
                setEditMode((prev) => !prev);
              }}
              disabled={target === null || isPlaying}
            />
          </div>
        </div>

        {editMode ? (
          <VisualArrayWrapper>
            {array.map((value, index, arr) => (
              <EditArrayItem
                key={index}
                value={value}
                index={index}
                onRemove={removeNumber}
                onChange={updateNumber}
                min={arr[index - 1]}
                max={arr[index + 1]}
              />
            ))}
            <Button
              className="ml-2 bg-green-500 hover:bg-green-600 "
              variant="destructive"
              size="icon"
              title="Add new value"
              onClick={() => addNumber(array[array.length - 1] + 1)}
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </VisualArrayWrapper>
        ) : (
          <VisualArrayWrapper>
            {array.map((value, index) => {
              const isComparing = currentSnapshot?.compareIndexes.some(
                (i: number) => i === index
              );
              return (
                <VisualArrayItem
                  key={index}
                  value={value}
                  index={index}
                  isComparing={isComparing}
                  isPointer={isComparing}
                  isSorted={currentSnapshot?.result === index}
                  isChecking={currentSnapshot?.checkIndex === index}

                />
              );
            })}
          </VisualArrayWrapper>
        )}

        <NotFoundTitle show={currentSnapshot.type === STEPS.notFound} />
      </div>
      <div>
        <TypographyH3 className="mb-3 font-bold">Code:</TypographyH3>
        <CodeViewers
          langMap={languagesMapSettings}
          language={codeLang}
          onLanguageChange={setCodeLang}
          step={currentSnapshot.type}
        />
      </div>
    </div>
  );
};
