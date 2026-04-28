import { TypographyH1 } from "@/components/ui/typography";
import { MinMaxHeapVisualize } from "@/widgets/min-max-heap";
import { HeapAlgorithmComplexities } from "./algorithm-complexities";

export function MinMaxHeapPage() {
  return (
    <main className="flex flex-col px-4 sm:px-24 py-10">
      <TypographyH1 className="self-center">Min-Max Heap</TypographyH1>
      <HeapAlgorithmComplexities />
      <MinMaxHeapVisualize />
    </main>
  );
}
