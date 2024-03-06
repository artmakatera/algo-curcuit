"use client";
import {
  BubbleInsertionSortVisualize,
  insertionSort,
  createStepSnapshot,
  languagesInsertSortMapSettings,
} from "@/widgets/bubble-insertion-sort-visualize";
import { TypographyH1 } from "@/components/ui/typography";


export function InsertionSortPage() {
  return (
    <main className="flex flex-col px-4 sm:px-24 py-10">
      <TypographyH1 className="self-center">Insertion Sort</TypographyH1>
      <BubbleInsertionSortVisualize
        createStepSnapshotThunk={createStepSnapshot}
        sort={insertionSort}
        languagesMapSettings={languagesInsertSortMapSettings}
      />
    </main>
  );
}
