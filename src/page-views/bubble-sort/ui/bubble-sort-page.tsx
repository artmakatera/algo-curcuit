"use client";
import BubbleSortVisualize from "@/widgets/bubble-sort-visualize/ui/bubble-sort-visualize";
import { TypographyH1 } from "@/components/ui/typography";
import { createStepSnapshot } from "@/widgets/bubble-sort-visualize/model/create-step-snapshot";

export function BubbleSortPage() {
  return (
    <main className="flex flex-col px-4 sm:px-24 py-10">
      <TypographyH1 className="self-center">Bubble Sort</TypographyH1>
      <BubbleSortVisualize createStepSnapshot={createStepSnapshot} />
    </main>
  );
}
