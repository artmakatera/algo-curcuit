import { TypographyH1 } from "@/components/ui/typography";
import { AlgorithmComplexities } from "@/features/algorithm-complexity";
import { DescriptionDialog } from "@/features/description-dialog";
import { COMPLEXITIES } from "@/shared/constants/complexities";
import { StackVisualize } from "@/widgets/stack-visualize";
import { DialogInfo } from "./dialog-info";

export function StackPage() {
  return (
    <main className="flex flex-col px-4 sm:px-24 py-10">
      <TypographyH1 className="self-center">Stack</TypographyH1>
      <div className="m-auto ">
        <AlgorithmComplexities
          spaceComplexity={COMPLEXITIES.O_1}
          timeComplexity={COMPLEXITIES.O_1}
        />
      </div>
      <DescriptionDialog
        title="Stack"
        spaceComplexity={COMPLEXITIES.O_1}
        timeComplexity={COMPLEXITIES.O_1}
      >
        <DialogInfo />
      </DescriptionDialog>
      <StackVisualize />
    </main>
  );
}
