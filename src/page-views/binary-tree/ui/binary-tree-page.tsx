import { TypographyH1 } from "@/components/ui/typography";
import { AlgorithmComplexities } from "@/features/algorithm-complexity";
import { COMPLEXITIES } from "@/shared/constants/complexities";
import { BinaryTree } from "@/widgets/binary-tree";
import {
  SpaceComplexityDescription,
  TimeComplexityDescription,
} from "./comlexitiy-descriptions";
import { DescriptionDialog } from "@/features/description-dialog";
import { DialogInfo } from "./dialog-info";

export const BinaryTreePage = () => {
  return (
    <main className="p-2 md:p-4 mx-auto">
      <TypographyH1 className="w-max text-center m-auto">
        Binary Search Tree
      </TypographyH1>
      <div className="flex justify-center items-center">
        <AlgorithmComplexities
          spaceComplexity={COMPLEXITIES.O_N}
          timeComplexity={COMPLEXITIES.O_LOG_N}
          spaceComplexityDescription={<SpaceComplexityDescription />}
          timeComplexityDescription={<TimeComplexityDescription />}
        />
      </div>
      <DescriptionDialog
        title="Binary Search Tree"
        spaceComplexity={COMPLEXITIES.O_N}
        timeComplexity={COMPLEXITIES.O_LOG_N}
        spaceComplexityDescription={<SpaceComplexityDescription />}
        timeComplexityDescription={<TimeComplexityDescription />}
     
      >
        <DialogInfo />
      </DescriptionDialog>
      <BinaryTree />
    </main>
  );
};
