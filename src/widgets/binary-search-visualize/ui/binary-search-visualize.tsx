"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Cross1Icon, Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";

// Constants
import { DEFAULT_SORTED_ARRAY, LANGUAGES, STEPS } from "../model/constants";

// Hooks
import { useNumberArray } from "@/shared/hooks/useNumberArray";
import { useSnapshots } from "../hooks/use-snapshots";

// Helpers
import { binarySearch } from "../model/binary-search";
import { createStepSnapshot } from "../model/create-step-snapshot";
import { getArrowClassName } from "../model/get-arrow-classname";
import { languagesMapSettings } from "../model/languages-map-settings";
import { cn, delay } from "@/shared/lib/utils";

// Types
import { GenValuePayload, StepSnapshot } from "../model/types";

// Components
import { VisualizeControls } from "@/features/visualizer-player-controls";
import { VisualArrayItem, VisualArrayWrapper } from "@/features/visual-array";
import { Button } from "@/components/ui/button";
import { TargetInput } from "@/components/ui/target-input";
import EditArrayItem from "@/features/visual-array/ui/edit-array-item";
import TypographyH3 from "@/components/ui/typography/typographyH3";
import { CodeViewer } from "@/components/ui/code-viewer";

export const BinarySearchVisualize = ({
  defaultArray,
  defaultSpeed = "750",
}: {
  defaultArray: number[];
  defaultSpeed?: string;
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [target, setTarget] = useState<number>(12);
  const [codeLang] = useState(LANGUAGES.javascript);

  const { array, updateNumber, addNumber, removeNumber } =
    useNumberArray(defaultArray);

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
  } = useSnapshots({ defaultDelay: defaultSpeed });

  useEffect(() => {
    const binarySearchCall = async (array: number[], target: number) => {
      setStepSnapshots([]);
      let generator = binarySearch(array, target);

      let next = generator.next();
      while (!next.done) {
        const { value } = next;
        setStepSnapshots((prev: StepSnapshot[]) => [
          ...prev,
          createStepSnapshot(value as GenValuePayload),
        ]);
        next = generator.next();
      }
    };

    binarySearchCall(array, target);
  }, [array, setStepSnapshots, target]);



  const handlePlay = useCallback(async () => {
    setEditMode(false);
    visualize();
    
  }, [visualize]);

 

  const updateTarget = useCallback(
    (value: string) => {
      reset();
      setTarget(+value);
    },
    [reset]
  );

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
              value={target}
              onChange={updateTarget}
              disabled={!editMode}
            />

            <Button
              className={cn(
                "ml-2 mb-0.5",
                editMode ? null : "bg-orange-500 hover:bg-orange-600"
              )}
              variant="destructive"
              size="icon"
              title="Edit"
              onClick={setEditMode.bind(null, (prev) => !prev)}
            >
              {editMode ? (
                <Cross1Icon data-testid="close-edit-icon" className="h-4 w-4" />
              ) : (
                <Pencil1Icon data-testid="open-edit-icon" className="h-4 w-4" />
              )}
            </Button>
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
                  isSorted={currentSnapshot?.result === index}
                  isChecking={currentSnapshot?.checkIndex === index}
                  className={
                    isComparing
                      ? cn(
                          getArrowClassName(
                            currentSnapshot.compareIndexes,
                            index
                          ),
                          "after:absolute after:left-1/2 after:-translate-x-1/2 after:z-1 after:-bottom-6 after:text-black dark:after:text-white"
                        )
                      : undefined
                  }
                />
              );
            })}
          </VisualArrayWrapper>
        )}
        <TypographyH3
          className={cn(
            "text-center font-bold text-disabled",
            currentSnapshot.type !== STEPS.notFound && "invisible"
          )}
        >
          {"Not Found :("}
        </TypographyH3>
      </div>
      <div>
        <TypographyH3 className="mb-3 font-bold">Code:</TypographyH3>
        <CodeViewer
          text={languagesMapSettings[codeLang]?.code}
          highlight={highlight}
        />
      </div>
    </div>
  );
};
