import { ComplexityCase } from "@/features/algorithm-complexity/ui/complexity-case";
import { COMPLEXITIES } from "@/shared/constants/complexities";

export function SpaceComplexityDescription() {
  return (
    <div className="text-pretty text-sm">
      Bubble sort is an "in-place" algorithm, meaning it requires minimal extra
      memory.
    </div>
  );
}

export function TimeComplexityDescription() {
  return (
    <div className="text-pretty flex flex-col gap-2 text-sm">
      <p className="text-pretty">
        Bubble sort's performance varies significantly depending on the initial
        order of the data.
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
