"use client";
import { TypographyH1 } from "@/components/ui/typography";
import { AlgorithmComplexities } from "@/features/algorithm-complexity";
import { COMPLEXITIES } from "@/shared/constants/complexities";
import {
  BinarySearchVisualize,
  DEFAULT_ROTATED_ARRAY,
  createRotatedBSStepSnapshot,
  languagesRotatedMapSettings,
  binarySearchRotatedSortedArray,
} from "@/widgets/binary-search-visualize";
import { SpaceComplexityDescription, TimeComplexityDescription } from "./comlexitiy-descriptions";
import { DescriptionDialog } from "@/features/description-dialog";
import { DialogInfo } from "./dialog-info";

export function BinarySearchRotatedArrayPage() {
  return (
    <main className="flex flex-col px-4 sm:px-24 py-10">
      <TypographyH1 className="self-center">
        Binary Search Rotated Array
      </TypographyH1>
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
        binarySearchFind={binarySearchRotatedSortedArray}
        createStepSnapshot={createRotatedBSStepSnapshot}
        defaultArray={DEFAULT_ROTATED_ARRAY}
        languagesMapSettings={languagesRotatedMapSettings}
      />
    </main>
  );
}
