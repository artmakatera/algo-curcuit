import { TypographyH1 } from "@/components/ui/typography";
import {
  BinarySearchVisualize,
  DEFAULT_SORTED_ARRAY,
} from "@/widgets/binary-search-visualize";

export function BinarySearchPage() {
  return (
    <main className="flex flex-col px-4 sm:px-24 py-10">
      <TypographyH1 className="self-center">Binary Search</TypographyH1>
      <BinarySearchVisualize defaultArray={DEFAULT_SORTED_ARRAY} />
    </main>
  );
}
