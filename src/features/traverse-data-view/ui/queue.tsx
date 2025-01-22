import { VisualArrayItem, VisualArrayWrapper } from "@/features/visual-array";
import { cn } from "@/shared/lib/utils";
import { TreeNode } from "@/widgets/binary-tree/model/binary-tree";
import { DataWrapper } from "./data-wrapper";
import { Node } from "@/features/tree-view";
import { MergeArrayWrapper } from "@/features/visual-merge-sort-array";

interface QueueProps {
  queue: TreeNode[];
  currentNode?: TreeNode | null;
}

export const Queue = ({ queue, currentNode }: QueueProps) => {
  return (
    <div className="flex gap-8 items-center ">
      <DataWrapper title={"Queue:"}>
        <MergeArrayWrapper
          className={cn(
            "relative min-w-10 mt-2",
            "before:absolute before:content-['←'] before:-left-4",
            "after:absolute after:content-['←'] after:-right-4"
          )}
        >
          {queue.map((node, index) => (
            <Node key={index} current={node} active preventAnimation />
          ))}
        </MergeArrayWrapper>
      </DataWrapper>
      {currentNode && (
        <DataWrapper title={"Current Node:"}>
          <MergeArrayWrapper className={cn("min-w-10 mt-2 bg-transparent")}>
            <Node current={currentNode} active />
          </MergeArrayWrapper>
        </DataWrapper>
      )}
    </div>
  );
};
