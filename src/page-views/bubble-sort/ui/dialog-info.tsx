import { TypographyList, TypographyP } from "@/components/ui/typography";
import { VisualArrayItem, VisualArrayWrapper } from "@/features/visual-array";
import { ArrowLeftRight } from "lucide-react";

export const DialogInfo = () => {
  return (
    <div>
      <TypographyP>
        Bubble sort is a simple sorting algorithm that repeatedly steps through
        the list, compares adjacent elements, and swaps them if they are in the
        wrong order.
      </TypographyP>
      <TypographyP>
        <strong>In essence:</strong> Bubble sort repeatedly compares and swaps
        adjacent elements until the list is sorted. Larger elements &quot;bubble&quot; to
        the end of the list.
      </TypographyP>
      <div className="grid place-items-center">
        <VisualArrayWrapper className="mt-4 -ml-4">
          <VisualArrayItem value={4} index={0} />
          <VisualArrayItem value={2} index={1} />
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
        <VisualArrayWrapper className="mt-4">
          <VisualArrayItem value={2} index={1} />
          <VisualArrayItem value={4} index={0} isChecking />
          <ArrowLeftRight />
          <VisualArrayItem value={1} index={2} isChecking />
          <VisualArrayItem value={3} index={3} />
        </VisualArrayWrapper>
        <VisualArrayWrapper className="mt-4">
          <VisualArrayItem value={2} index={1} />
          <VisualArrayItem value={1} index={2} />
          <VisualArrayItem value={4} index={0} isChecking />
          <ArrowLeftRight />
          <VisualArrayItem value={3} index={3} isChecking />
        </VisualArrayWrapper>
        <VisualArrayWrapper className="mt-4 -ml-4">
          <VisualArrayItem value={2} index={1} />
          <VisualArrayItem value={1} index={2} />
          <VisualArrayItem value={3} index={3} />
          <VisualArrayItem value={4} index={0} isSorted />
        </VisualArrayWrapper>
        <VisualArrayWrapper className="mt-4 ">
          <VisualArrayItem value={2} index={1} isChecking />
          <ArrowLeftRight />
          <VisualArrayItem value={1} index={2} isChecking />
          <VisualArrayItem value={3} index={3} />
          <VisualArrayItem value={4} index={0} isSorted />
        </VisualArrayWrapper>
        <VisualArrayWrapper className="mt-4 -ml-4">
          <VisualArrayItem value={1} index={2}  />
          <VisualArrayItem value={2} index={1} isComparing />
          <VisualArrayItem value={3} index={3} isComparing />
          <VisualArrayItem value={4} index={0} isSorted />
        </VisualArrayWrapper>
        <VisualArrayWrapper className="mt-4 -ml-4">
          <VisualArrayItem value={1} index={2}  />
          <VisualArrayItem value={2} index={1}  />
          <VisualArrayItem value={3} index={3} isSorted />
          <VisualArrayItem value={4} index={0} isSorted />
        </VisualArrayWrapper>
        <VisualArrayWrapper className="mt-4 -ml-4">
          <VisualArrayItem value={1} index={2} isComparing />
          <VisualArrayItem value={2} index={1} isComparing />
          <VisualArrayItem value={3} index={3} isSorted />
          <VisualArrayItem value={4} index={0} isSorted />
        </VisualArrayWrapper>
        <VisualArrayWrapper className="mt-4 -ml-4">
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
          <strong>Limited Practical Use:</strong> Rarely used in practice due
          to its inefficiency.
        </li>
      </TypographyList>
    </div>
  );
};
