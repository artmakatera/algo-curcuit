"use client";
import { TypographyH1 } from "@/components/ui/typography";
import { AlgorithmComplexities } from "@/features/algorithm-complexity";
import { DescriptionDialog } from "@/features/description-dialog";
import { COMPLEXITIES } from "@/shared/constants/complexities";
import {
  BinarySearchVisualize,
  DEFAULT_SORTED_ARRAY,
  createBinarySearchStepSnapshot,
} from "@/widgets/binary-search-visualize";
import {
  SpaceComplexityDescription,
  TimeComplexityDescription,
} from "./comlexitiy-descriptions";
import { DialogInfo } from "./dialog-info";

export function BinarySearchPage() {
  return (
    <main className="flex flex-col px-4 sm:px-24 py-10">
      <TypographyH1 className="self-center">Binary Search</TypographyH1>
      <div className="m-auto ">
        <AlgorithmComplexities
          spaceComplexity={COMPLEXITIES.O_1}
          timeComplexity={COMPLEXITIES.O_LOG_N}
          spaceComplexityDescription={<SpaceComplexityDescription />}
          timeComplexityDescription={<TimeComplexityDescription />}
        />
      </div>
      <DescriptionDialog
        title="Binary Search"
        spaceComplexity={COMPLEXITIES.O_1}
        timeComplexity={COMPLEXITIES.O_LOG_N}
        spaceComplexityDescription={<SpaceComplexityDescription />}
        timeComplexityDescription={<TimeComplexityDescription />}
      >
        <DialogInfo />
      </DescriptionDialog>
      <BinarySearchVisualize
        defaultArray={DEFAULT_SORTED_ARRAY}
        createStepSnapshot={createBinarySearchStepSnapshot}
      />
    </main>
  );
}
