import { Button } from "@/components/ui/button";
import { CodeViewers } from "@/components/ui/code-viewers";
import { NotFoundTitle } from "@/components/ui/not-found-title";
import TypographyH3 from "@/components/ui/typography/typographyH3";
import { VisualArrayItem, VisualArrayWrapper } from "@/features/visual-array";
import EditArrayItem from "@/features/visual-array/ui/edit-array-item";
import { useCodeLang } from "@/shared/contexts/code-lang";
import { useNumberArray } from "@/shared/hooks/use-number-array";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { languagesMapSettings } from "../model/two-sum/languages-map-settings";
import { useSnapshots } from "@/shared/hooks/use-snapshots";
import { GenValuePayload, StepSnapshot } from "../model/types";
import { defaultSnapshots, createStepSnapshot } from "../model/create-step-snapshot";
import { twoSumSorted } from "../model/two-sum/two-sum";
import { VisualizeControls } from "@/features/visualizer-player-controls/ui/visualizer-player-controls";
import { TargetInput } from "@/components/ui/target-input";
import { EditButton } from "@/features/edit-button/ui/edit-button";
import { STEPS } from "../model/constants";



const defaultArray = [1,3,4,5,7,10,12,15,18,20];

export function TwoSumVisualize() {
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
        } = useSnapshots<StepSnapshot, GenValuePayload, [number[], number]>({
          defaultDelay: "750",
          defaultSnapshots: defaultSnapshots,
          genCall: twoSumSorted as unknown as (
            ...args: [number[], number]
          ) => Generator<GenValuePayload, void, unknown>,
          genCallArgs: [array, target || 0],
          createStepSnapshot: createStepSnapshot
        });
      
        const handlePlay =  () => {
          setEditMode(false);
          visualize();
        }
      
        const updateTarget = (value: string) => {
          setTarget(value === "" ? null : +value);
        };
      


  return (<>
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

              const isFound = currentSnapshot?.result?.some(
                (i: number) => i === index
              );

              return (
                <VisualArrayItem
                  key={index}
                  value={value}
                  index={index}
                  isComparing={isComparing}
                  isPointer={isComparing}
                  isSorted={isFound}

                />
              );
            })}
          </VisualArrayWrapper>
        )}

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
  </>)


}