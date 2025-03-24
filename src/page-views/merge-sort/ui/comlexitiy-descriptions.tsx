import { ComplexityBadge } from "@/features/algorithm-complexity/ui/complexity-badge";
import { COMPLEXITIES, Complexity } from "@/shared/constants/complexities";

export function SpaceComplexityDescription() {
  return (
    <div className="text-pretty text-sm">
      Merge sort requires extra memory to hold the merged sublists. It is not an
      "in-place" sorting algorithm.
    </div>
  );
}

export function TimeComplexityDescription() {
  return (
    <div className="text-pretty flex flex-col gap-2 text-sm">
      <p className="text-pretty  ">
        Merge sort has a consistent time complexity, making it very predictable.
      </p>
      <ComplexityCase label="Best Case:" complexity={COMPLEXITIES.O_N_LOG_N} />
      <ComplexityCase label="Average Case:" complexity={COMPLEXITIES.O_N_LOG_N} />
      <ComplexityCase label="Worst Case:" complexity={COMPLEXITIES.O_N_LOG_N} />
    </div>
  );
}


function ComplexityCase({ complexity, label }: {label: string, complexity: Complexity}) {
  return (
    <div className="flex justify-between">
      <strong>{label}</strong>
      <ComplexityBadge complexity={complexity} />
    </div>
  );
}
