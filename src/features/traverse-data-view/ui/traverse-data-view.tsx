import { TreeNode } from "@/widgets/binary-tree/model/binary-tree";
import { Queue } from "./queue";
import { ResultArray } from "./result-array";

interface TraverseDataViewProps {
  queue: TreeNode[];
  result: TreeNode[];
  currentNode?: TreeNode | null;
}

export const TraverseDataView = ({ result, queue ,currentNode }: TraverseDataViewProps) => {
  return (
    <div className="mb-4 flex flex-col ">
      <Queue queue={queue} currentNode={currentNode} />
      <ResultArray result={result} />
    </div>
  );
};
