import { ComplexityCase } from "@/features/algorithm-complexity/ui/complexity-case";
import { COMPLEXITIES } from "@/shared/constants/complexities";

export function SpaceComplexityDescription() {
  return (
    <div className="text-pretty text-sm">
     Iterative binary search requires minimal extra memory. Recursive binary search requires space for the call stack.
    </div>
  );
}

export function TimeComplexityDescription() {
  return (
    <div className="text-pretty flex flex-col gap-2 text-sm">
      <p className="text-pretty">
      Binary search has a very efficient time complexity, making it suitable for large datasets.
      </p>
      <ComplexityCase label="Best Case:" complexity={COMPLEXITIES.O_1} />
      <ComplexityCase
        label="Average Case:"
        complexity={COMPLEXITIES.O_LOG_N}
      />
      <ComplexityCase
        label="Worst Case:"
        complexity={COMPLEXITIES.O_LOG_N}
      />
    </div>
  );
}
