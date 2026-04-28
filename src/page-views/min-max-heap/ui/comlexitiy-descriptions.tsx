import { ComplexityCase } from "@/features/algorithm-complexity/ui/complexity-case";
import { COMPLEXITIES } from "@/shared/constants/complexities";



export function QueryTimeDescription() {
  return (
    <div className="text-pretty flex flex-col gap-2 text-sm">
      <p>
        <strong>peek</strong> returns the value at index 0 (the root) — the
        minimum for a min-heap, the maximum for a max-heap. No traversal
        needed.
      </p>
      <ComplexityCase label="Time Complexity:" complexity={COMPLEXITIES.O_1} />
      <ComplexityCase label="Space Complexity:" complexity={COMPLEXITIES.O_1} />
    </div>
  );
}

export function PushTimeDescription() {
  return (
    <div className="text-pretty flex flex-col gap-2 text-sm">
      <p>
        <strong>push</strong> appends the value to the end of the array, then
        bubbles it up by repeatedly swapping with its parent until the heap
        property is restored. The number of swaps is bounded by the tree
        height <code>⌊log₂(n)⌋</code>.
      </p>
      <ComplexityCase label="Time Complexity:" complexity={COMPLEXITIES.O_LOG_N} />
      <ComplexityCase label="Space Complexity:" complexity={COMPLEXITIES.O_1} />
    </div>
  );
}

export function PopTimeDescription() {
  return (
    <div className="text-pretty flex flex-col gap-2 text-sm">
      <p>
        <strong>pop</strong> removes the root, moves the last element to the
        top, then bubbles it down — at each level it compares with both
        children and swaps with the smaller (min-heap) or larger (max-heap)
        child. Sift-down runs in time proportional to the tree height.
      </p>
      <ComplexityCase label="Time Complexity:" complexity={COMPLEXITIES.O_LOG_N} />
      <ComplexityCase label="Space Complexity:" complexity={COMPLEXITIES.O_1} />
    </div>
  );
}
