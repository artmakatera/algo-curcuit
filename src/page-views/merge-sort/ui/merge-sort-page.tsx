import { TypographyH1 } from "@/components/ui/typography";
import { DescriptionDialog } from "@/features/description-dialog";
import { MergeSortVisualize } from "@/widgets/merge-sort-visualize";
import { DialogInfo } from "./dialog-info";
import { COMPLEXITIES } from "@/shared/constants/complexities";
import {
  SpaceComplexityDescription,
  TimeComplexityDescription,
} from "./comlexitiy-descriptions";
import { AlgorithmComplexities } from "@/features/algorithm-complexity";

export function MergeSortPage() {
  return (
    <main className="flex flex-col px-4 sm:px-24 py-10">
      <TypographyH1 className="self-center">Merge Sort</TypographyH1>
      <div className="m-auto ">
        <AlgorithmComplexities
          spaceComplexity={COMPLEXITIES.O_N}
          timeComplexity={COMPLEXITIES.O_N_LOG_N}
          spaceComplexityDescription={<SpaceComplexityDescription />}
          timeComplexityDescription={<TimeComplexityDescription />}
        />
      </div>
      <DescriptionDialog
        spaceComplexity={COMPLEXITIES.O_N}
        timeComplexity={COMPLEXITIES.O_N_LOG_N}
        spaceComplexityDescription={<SpaceComplexityDescription />}
        timeComplexityDescription={<TimeComplexityDescription />}
      >
        <DialogInfo />
      </DescriptionDialog>
      <MergeSortVisualize />
    </main>
  );
}
