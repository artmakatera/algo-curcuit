import { VisualArrayItem, VisualArrayWrapper } from "@/features/visual-array";
import { cn } from "@/shared/lib/utils";
import { TreeNode } from "@/widgets/binary-tree/model/binary-tree";
import { DataWrapper } from "./data-wrapper";
import { Node } from "@/features/tree-view";
import { MergeArrayWrapper } from "@/features/visual-merge-sort-array";

interface ResultArrayProps {
  result: TreeNode[];
}

export const ResultArray = ({ result }: ResultArrayProps) => {
  return (
    <DataWrapper title={"Result:"}>
      <MergeArrayWrapper
        className={cn("mt-2 p-2 relative min-w-10")}
      >
        {result.map((node, index) => (
          <Node key={index} current={node} inserted preventAnimation />
        ))}
      </MergeArrayWrapper>
    </DataWrapper>
  );
};
