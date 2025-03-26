import { TypographyList, TypographyP } from "@/components/ui/typography";
import { VisualArrayItem, VisualArrayWrapper } from "@/features/visual-array";
import { ArrowLeft, ArrowLeftRight } from "lucide-react";

export const DialogInfo = () => {
  return (
    <div>
      <TypographyP>
        Binary search is an efficient algorithm for finding a target value
        within a sorted array.
      </TypographyP>
      <TypographyP>
        <strong>In essence:</strong> Binary search repeatedly divides the search
        interval in half. It compares the middle element of the array to the
        target value. If they match, the search is complete. If the target value
        is less than the middle element, the search continues in the left half.
        If it's greater, the search continues in the right half.
      </TypographyP>
      <TypographyP>
        For instance find 6:
      </TypographyP>
      <div className="grid place-items-center">
        <VisualArrayWrapper className="mt-4 -ml-4">
          <VisualArrayItem value={1} index={2} />
          <VisualArrayItem value={2} index={1} />
          <VisualArrayItem value={3} index={3} />
          <VisualArrayItem value={4} index={0} />
          <VisualArrayItem value={5} index={4} />
          <VisualArrayItem value={6} index={5} />
          <VisualArrayItem value={7} index={6}  />
        </VisualArrayWrapper>
        <VisualArrayWrapper className="mt-4 -ml-4">
          <VisualArrayItem value={1} index={2} isComparing />
          <VisualArrayItem value={2} index={1} />
          <VisualArrayItem value={3} index={3} />
          <VisualArrayItem value={4} index={0} isChecking />
          <VisualArrayItem value={5} index={4} />
          <VisualArrayItem value={6} index={5} />
          <VisualArrayItem value={7} index={6} isComparing />
        </VisualArrayWrapper>
        <VisualArrayWrapper className="mt-4 -ml-4">
          <VisualArrayItem value={1} index={2} className="opacity-40" />
          <VisualArrayItem value={2} index={1} className="opacity-40" />
          <VisualArrayItem value={3} index={3} className="opacity-40" />
          <VisualArrayItem value={4} index={0} className="opacity-40" />
          <VisualArrayItem value={5} index={4} isComparing />
          <VisualArrayItem value={6} index={5} isChecking />
          <VisualArrayItem value={7} index={6} isComparing />
        </VisualArrayWrapper>
        <VisualArrayWrapper className="mt-4 -ml-4">
          <VisualArrayItem value={1} index={2} className="opacity-40" />
          <VisualArrayItem value={2} index={1} className="opacity-40" />
          <VisualArrayItem value={3} index={3} className="opacity-40" />
          <VisualArrayItem value={4} index={0} className="opacity-40" />
          <VisualArrayItem value={5} index={4} className="opacity-40" />
          <VisualArrayItem value={6} index={5} isSorted />
          <VisualArrayItem value={7} index={6} className="opacity-40" />
        </VisualArrayWrapper>
      </div>
      <TypographyP>Pros:</TypographyP>
      <TypographyList>
        <li>
          <strong>Efficient for Large Datasets:</strong> Efficient for Large Datasets
        </li>
        <li>
          <strong>Simple Implementation (Iterative):</strong>  Relatively easy to understand and implement.
        </li>
       
      </TypographyList>
      <TypographyP>Cons:</TypographyP>
      <TypographyList>
        <li>
          <strong>Requires Sorted Data: </strong> Only works on sorted arrays.
        </li>

      </TypographyList>
    </div>
  );
};
