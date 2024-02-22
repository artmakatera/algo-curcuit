"use client";
import { TypographyH1 } from "@/components/ui/typography";
import {
  BinarySearchVisualize,
  DEFAULT_ROTATED_ARRAY,
  createRotatedBSStepSnapshot,
  languagesRotatedMapSettings,
  binarySearchRotatedSortedArray,
} from "@/widgets/binary-search-visualize";

export function BinarySearchRotatedArrayPage() {
  return (
    <main className="flex flex-col px-4 sm:px-24 py-10">
      <TypographyH1 className="self-center">
        Binary Search Rotated Array
      </TypographyH1>
      <BinarySearchVisualize
        binarySearchFind={binarySearchRotatedSortedArray}
        createStepSnapshot={createRotatedBSStepSnapshot}
        defaultArray={DEFAULT_ROTATED_ARRAY}
        languagesMapSettings={languagesRotatedMapSettings}
      />
    </main>
  );
}
