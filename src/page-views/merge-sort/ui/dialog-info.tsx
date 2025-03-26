import { TypographyList, TypographyP } from "@/components/ui/typography";
import { VisualArrayItem, VisualArrayWrapper } from "@/features/visual-array";

export function DialogInfo() {
  return (
    <div>
      <TypographyP>
        Merge sort is a classic &quot;divide and conquer&quot; sorting algorithm. It works
        by:
      </TypographyP>
      <TypographyList>
        <li>
          <strong>Divide:</strong> Recursively splitting the unsorted list into
          sublists until each sublist contains only one element (a list of one
          element is considered sorted).
        </li>
        <li>
          <strong>Conquer:</strong> Repeatedly merging the sublists to produce
          new sorted sublists until there is only one sublist remaining. This
          will be the sorted list.
        </li>
      </TypographyList>

      <TypographyP>
        Merge sort breaks down the problem into smaller, manageable pieces,
        sorts those pieces, and then combines them in a way that results in a
        fully sorted list.
      </TypographyP>

      <div className="grid place-items-center">
        <VisualArrayWrapper>
          <div className="relative">
            <VisualArrayItem value={4} index={0} />
            <div className="absolute top-full left-1/2 w-px h-[4.2rem] bg-gray-400 origin-top-left rotate-45 " />
          </div>
          <div className="relative">
            <VisualArrayItem value={2} index={1} />
            <div className="absolute top-full left-1/2 w-px h-[3.2rem] bg-gray-400 origin-top-left rotate-[18deg] " />
          </div>
          <div className="relative">
            <VisualArrayItem value={1} index={2} />
            <div className="absolute top-full left-1/2 w-px h-[3.2rem] bg-gray-400 origin-top-left rotate-[-18deg] " />
          </div>
          <div className="relative">
            <VisualArrayItem value={3} index={3} />
            <div className="absolute top-full left-1/2 w-px h-[4.2rem] bg-gray-400 origin-top-left -rotate-45 " />
          </div>
        </VisualArrayWrapper>
        <VisualArrayWrapper className="gap-8">
          <div className="relative">
            <VisualArrayItem isComparing value={4} index={0} />
            <div className="absolute top-full left-1/2 w-px h-[5.9rem] bg-gray-400 origin-top-left -rotate-[58deg] " />
          </div>
          <div className="relative">
            <VisualArrayItem isComparing value={2} index={1} />
            <div className="absolute top-full left-1/2 w-px h-[4.2rem] bg-gray-400 origin-top-left rotate-45 " />
          </div>
          <div className="relative">
            <VisualArrayItem isComparing value={1} index={2} />
            <div className="absolute top-full left-1/2 w-px h-12 bg-gray-400" />
          </div>
          <div className="relative">
            <VisualArrayItem isComparing value={3} index={3} />
            <div className="absolute top-full left-1/2 w-px h-14.5 bg-gray-400 origin-top-left rotate-32 " />
          </div>
        </VisualArrayWrapper>
        <VisualArrayWrapper className="gap-8">
          <div className="flex">
            <div className="relative">
              <VisualArrayItem isChecking value={2} index={1} />
              <div className="absolute top-full left-1/2 w-px h-20 bg-gray-400 origin-top-left -rotate-53 " />
            </div>
            <div className="relative">
              <VisualArrayItem value={4} index={0} />
              <div className="absolute top-full left-1/2 w-px h-30 bg-gray-400 origin-top-left -rotate-[65.5deg] " />
            </div>
          </div>
          <div className="flex">
            <div className="relative">
              <VisualArrayItem isChecking value={1} index={2} />
              <div className="absolute top-full left-1/2 w-px h-31 bg-gray-400 origin-top-left rotate-[67deg] " />
            </div>
            <div className="relative">
              <VisualArrayItem value={3} index={3} />
              <div className="absolute top-full left-1/2 w-px h-20 bg-gray-400 origin-top-left rotate-52 " />
            </div>
          </div>
        </VisualArrayWrapper>
        <VisualArrayWrapper>
          <VisualArrayItem isSorted value={1} index={2} />
          <VisualArrayItem isSorted value={2} index={1} />
          <VisualArrayItem isSorted value={3} index={3} />
          <VisualArrayItem isSorted value={4} index={0} />
        </VisualArrayWrapper>
      </div>
      <TypographyP>Pros: :</TypographyP>
      <TypographyList>
        <li>
          <strong>Stable sorting:</strong> Preserves the relative order of
          elements with equal values.
        </li>
        <li>
          <strong>Efficient and Consistent Time Complexity:</strong> Guarantees
          O(n log n) time complexity for all cases (best, average, and worst).
        </li>
        <li>
          <strong>Well-Suited for Large Datasets:</strong> Performs efficiently
          on large amounts of data.
        </li>
      </TypographyList>
      <TypographyP>
        Merge sort is a classic &quot;divide and conquer&quot; sorting algorithm. It works
        by:
      </TypographyP>
      <TypographyList>
        <li>
          <strong>Extra Space Requirement:</strong> Requires additional memory
          proportional to the size of the input (O(n)).
        </li>
        <li>
          <strong>Slightly Slower for Small Datasets:</strong> Rhe overhead of
          the recursive calls and merging process can make it slightly slower
          than simpler sorting algorithms for very small lists.
        </li>
      </TypographyList>
    </div>
  );
}
