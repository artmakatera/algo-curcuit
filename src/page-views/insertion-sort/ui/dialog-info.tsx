import { TypographyList, TypographyP } from "@/components/ui/typography";
import { VisualArrayItem, VisualArrayWrapper } from "@/features/visual-array";
import { ArrowLeft, ArrowLeftRight } from "lucide-react";

export const DialogInfo = () => {
  return (
    <div>
      <TypographyP>
        Insertion sort is a simple sorting algorithm that builds the final
        sorted array (or list) one item at a time.
      </TypographyP>
      <TypographyP>
        <strong>In essence:</strong> Insertion sort iterates through the input,
        removing one element per iteration, finding the location it belongs
        within the sorted list, and inserts it there. It repeats until no input
        elements remain.
      </TypographyP>
      <div className="grid place-items-center">
        <VisualArrayWrapper className="mt-4 -ml-4">
          <VisualArrayItem value={4} index={0} />
          <VisualArrayItem value={2} index={1} isComparing />
          <VisualArrayItem value={1} index={2} />
          <VisualArrayItem value={3} index={3} />
        </VisualArrayWrapper>
        <VisualArrayWrapper className="mt-4">
          <VisualArrayItem value={4} index={0} isChecking />
          <ArrowLeftRight />
          <VisualArrayItem value={2} index={1} isChecking />
          <VisualArrayItem value={1} index={2} />
          <VisualArrayItem value={3} index={3} />
        </VisualArrayWrapper>
        <VisualArrayWrapper className="mt-4 -ml-4">
          <VisualArrayItem value={2} index={1} isChecking />
          <VisualArrayItem value={4} index={0} />
          <VisualArrayItem value={1} index={2} />
          <VisualArrayItem value={3} index={3} />
        </VisualArrayWrapper>
        <VisualArrayWrapper className="mt-4 -ml-4">
          <VisualArrayItem value={2} index={1} />
          <VisualArrayItem value={4} index={0} />
          <VisualArrayItem value={1} index={2} isComparing />
          <VisualArrayItem value={3} index={3} />
        </VisualArrayWrapper>
        <VisualArrayWrapper className="mt-4">
          <VisualArrayItem value={2} index={1} />
          <VisualArrayItem value={4} index={0} isChecking />
          <ArrowLeftRight />
          <VisualArrayItem value={1} index={2} isChecking />
          <VisualArrayItem value={3} index={3} />
        </VisualArrayWrapper>
        <VisualArrayWrapper className="mt-4">
          <VisualArrayItem value={2} index={1} isChecking />
          <ArrowLeftRight />
          <VisualArrayItem value={1} index={2} isChecking />
          <VisualArrayItem value={4} index={0} isComparing />
          <VisualArrayItem value={3} index={3} />
        </VisualArrayWrapper>
        <VisualArrayWrapper className="mt-4 -ml-4">
          <VisualArrayItem value={1} index={2} />
          <VisualArrayItem value={2} index={1} />
          <VisualArrayItem value={4} index={0} />
          <VisualArrayItem value={3} index={3} isComparing />
        </VisualArrayWrapper>
        <VisualArrayWrapper className="mt-4">
          <VisualArrayItem value={1} index={2} />
          <VisualArrayItem value={2} index={1} />
          <VisualArrayItem value={4} index={0} isChecking />
          <ArrowLeftRight />
          <VisualArrayItem value={3} index={3} isChecking />
        </VisualArrayWrapper>
        <VisualArrayWrapper className="mt-4">
          <VisualArrayItem value={1} index={2} />
          <VisualArrayItem value={2} index={1} />
          <VisualArrayItem value={3} index={3} isComparing />
          <VisualArrayItem value={4} index={0}  />
        </VisualArrayWrapper>
        <VisualArrayWrapper className="mt-4">
          <VisualArrayItem value={1} index={2} isSorted />
          <VisualArrayItem value={2} index={1} isSorted />
          <VisualArrayItem value={3} index={3} isSorted />
          <VisualArrayItem value={4} index={0} isSorted />
        </VisualArrayWrapper>
      </div>
      <TypographyP>Pros:</TypographyP>
      <TypographyList>
        <li>
          <strong>Simple implementation:</strong> Easy to understand and
          implement.
        </li>
        <li>
          <strong>Efficient for Small Datasets:</strong> Performs well on small
          lists.
        </li>
        <li>
          <strong>Efficient for Nearly Sorted Data:</strong>Very efficient when
          the input data is already partially sorted.
        </li>
        <li>
          <strong>Space complexity:</strong> In-place sorting algorithm.
        </li>
        <li>
          <strong>Stable:</strong> Preserves the relative order of elements with
          equal values.
        </li>
      </TypographyList>
      <TypographyP>Cons:</TypographyP>
      <TypographyList>
        <li>
          <strong>Inefficient for Large Datasets: </strong> Poor performance
          with large datasets due to its quadratic time complexity (O(n2)).
        </li>
        <li>
          <strong>Slow Performance:</strong> Generally slower than other sorting
          algorithms.
        </li>
        <li>
          <strong>Slow Performance:</strong> Generally slower than more advanced
          sorting algorithms like Merge Sort or Quick Sort.
        </li>
      </TypographyList>
    </div>
  );
};
