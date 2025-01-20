import { TypographyH1 } from "@/components/ui/typography";
import { MergeSortVisualize } from "@/widgets/merge-sort-visualize";

export function MergeSortPage() {
  return (
    <main className="flex flex-col px-4 sm:px-24 py-10">
      <TypographyH1 className="self-center">Merge Sort</TypographyH1>
      <MergeSortVisualize />
    </main>
  );
}
