import { VisualArrayItem } from "@/features/visual-array";
import {
  MergeArray,
  MergeArrayWrapper,
  MergeSubArrayWrapper,
} from "@/features/visual-merge-sort-array";

export const MergeSortVisualize = () => {
  return (
    <div className="mt-12">
      <MergeArray />
      {/* <MergeSubArrayWrapper>
        <VisualArrayItem value={2} index={0} className="bg-background" />
        <VisualArrayItem value={12} index={0} className="bg-background" />
        <VisualArrayItem value={22} index={0} className="bg-background" />
        <VisualArrayItem value={121} index={0} className="bg-background" />
      </MergeSubArrayWrapper> */}
    </div>
  );
};
