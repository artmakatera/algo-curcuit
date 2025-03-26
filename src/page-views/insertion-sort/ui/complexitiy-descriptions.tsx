import { ComplexityCase } from "@/features/algorithm-complexity/ui/complexity-case";
import { COMPLEXITIES } from "@/shared/constants/complexities";

export function SpaceComplexityDescription() {
  return (
    <div className="text-pretty text-sm">
      Insertion sort is an &quot;in-place&quot; algorithm, meaning it requires minimal
      extra memory.
    </div>
  );
}

export function TimeComplexityDescription() {
  return (
    <div className="text-pretty flex flex-col gap-2 text-sm">
      <p className="text-pretty">
        Insertion sort performs efficiently on nearly sorted data but degrades
        on reverse-sorted or randomly ordered data.
      </p>
      <ComplexityCase label="Best Case:" complexity={COMPLEXITIES.O_N} />
      <ComplexityCase
        label="Average Case:"
        complexity={COMPLEXITIES.O_N_SQUARE}
      />
      <ComplexityCase
        label="Worst Case:"
        complexity={COMPLEXITIES.O_N_SQUARE}
      />
    </div>
  );
}
