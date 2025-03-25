"use client";
import {
  BubbleInsertionSortVisualize,
  bubbleSort,
  createStepSnapshot,
  languagesMapSettings,
} from "@/widgets/bubble-insertion-sort-visualize";
import { TypographyH1 } from "@/components/ui/typography";
import { AlgorithmComplexities } from "@/features/algorithm-complexity";
import {
  SpaceComplexityDescription,
  TimeComplexityDescription,
} from "./comlexitiy-descriptions";
import { COMPLEXITIES } from "@/shared/constants/complexities";
import { DescriptionDialog } from "@/features/description-dialog";
import { DialogInfo } from "./dialog-info";

const getIsSorted = (index: number, sortedIndex: number) =>
  index >= sortedIndex;

export function BubbleSortPage() {
  return (
    <main className="flex flex-col px-4 sm:px-24 py-10">
      <TypographyH1 className="self-center">Bubble Sort</TypographyH1>
      <div className="m-auto ">
        <AlgorithmComplexities
          spaceComplexity={COMPLEXITIES.O_1}
          timeComplexity={COMPLEXITIES.O_N_SQUARE}
          spaceComplexityDescription={<SpaceComplexityDescription />}
          timeComplexityDescription={<TimeComplexityDescription />}
        />
      </div>
      <DescriptionDialog
        title="Buble Sort"
        spaceComplexity={COMPLEXITIES.O_1}
        timeComplexity={COMPLEXITIES.O_N_SQUARE}
        spaceComplexityDescription={<SpaceComplexityDescription />}
        timeComplexityDescription={<TimeComplexityDescription />}
      >
        <DialogInfo />
      </DescriptionDialog>
      <BubbleInsertionSortVisualize
        createStepSnapshotThunk={createStepSnapshot}
        sort={bubbleSort}
        languagesMapSettings={languagesMapSettings}
        getIsSorted={getIsSorted}
      />
    </main>
  );
}
