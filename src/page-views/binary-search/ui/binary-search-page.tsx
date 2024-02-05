import { TypographyH1 } from "@/components/ui/typography";
import { BinarySearchVisualize } from "@/widgets/header/binary-search-visualize";




export function BinarySearchPage() {
  return (
    <main className="flex flex-col px-24 py-10">
    <TypographyH1 className="self-center">Binary Search</TypographyH1>
    <BinarySearchVisualize />

 
  </main>
  );
}