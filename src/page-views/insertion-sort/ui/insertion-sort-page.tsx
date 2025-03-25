"use client";
import {
  BubbleInsertionSortVisualize,
  insertionSort,
  createStepSnapshot,
  languagesInsertSortMapSettings,
} from "@/widgets/bubble-insertion-sort-visualize";
import { TypographyH1 } from "@/components/ui/typography";
import { AlgorithmComplexities } from "@/features/algorithm-complexity";
import { COMPLEXITIES } from "@/shared/constants/complexities";
import { SpaceComplexityDescription, TimeComplexityDescription } from "./complexitiy-descriptions";
import { DescriptionDialog } from "@/features/description-dialog";
import { DialogInfo } from "./dialog-info";


export function InsertionSortPage() {
  return (
    <main className="flex flex-col px-4 sm:px-24 py-10">
      <TypographyH1 className="self-center">Insertion Sort</TypographyH1>
            <div className="m-auto ">
              <AlgorithmComplexities
                spaceComplexity={COMPLEXITIES.O_1}
                timeComplexity={COMPLEXITIES.O_N_SQUARE}
                spaceComplexityDescription={<SpaceComplexityDescription />}
                timeComplexityDescription={<TimeComplexityDescription />}
              />
            </div>
            <DescriptionDialog
              title="Insertion Sort"
              spaceComplexity={COMPLEXITIES.O_1}
              timeComplexity={COMPLEXITIES.O_N_SQUARE}
              spaceComplexityDescription={<SpaceComplexityDescription />}
              timeComplexityDescription={<TimeComplexityDescription />}
            >
              <DialogInfo />
            </DescriptionDialog>
      <BubbleInsertionSortVisualize
        createStepSnapshotThunk={createStepSnapshot}
        sort={insertionSort}
        languagesMapSettings={languagesInsertSortMapSettings}
      />
    </main>
  );
}
