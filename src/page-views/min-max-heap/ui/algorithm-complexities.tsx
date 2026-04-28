import { Eye, ArrowUp, ArrowDown } from "lucide-react";
import { COMPLEXITIES } from "@/shared/constants/complexities";
import { AlgorithmComplexity } from "@/features/algorithm-complexity/ui/algorithm-complexity";
import {
  PopTimeDescription,
  PushTimeDescription,
  QueryTimeDescription,
} from "./comlexitiy-descriptions";

export const HeapAlgorithmComplexities = () => {
  return (
    <div className="m-auto mt-2 flex flex-wrap items-center justify-center gap-2">
      <AlgorithmComplexity
        complexity={COMPLEXITIES.O_1}
        icon={Eye}
        badgeLabel="Query"
        description={<QueryTimeDescription />}
      />
      <AlgorithmComplexity
        complexity={COMPLEXITIES.O_LOG_N}
        icon={ArrowUp}
        badgeLabel="Push"
        description={<PushTimeDescription />}
      />
      <AlgorithmComplexity
        complexity={COMPLEXITIES.O_LOG_N}
        icon={ArrowDown}
        badgeLabel="Pop"
        description={<PopTimeDescription />}
      />
    </div>
  );
};
