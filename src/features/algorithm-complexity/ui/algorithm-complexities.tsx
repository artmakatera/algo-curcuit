import { Complexity } from "@/shared/constants/complexities";
import { AlgorithmComplexity } from "./algorithm-complexity";

interface AlgorithmComplexityProps {
  spaceComplexity?: Complexity;
  timeComplexity?: Complexity;
  timeComplexityDescription?: React.ReactNode;
  spaceComplexityDescription?: React.ReactNode;
}

export function AlgorithmComplexities({
  spaceComplexity,
  timeComplexity,
  spaceComplexityDescription,
  timeComplexityDescription,
}: AlgorithmComplexityProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {spaceComplexity && (
        <AlgorithmComplexity
          complexity={spaceComplexity}
          description={spaceComplexityDescription}
          isSpaceComplexity
        />
      )}

      {timeComplexity && (
        <AlgorithmComplexity
          key="time-complexity"
          complexity={timeComplexity}
          description={timeComplexityDescription}
        />
      )}
    </div>
  );
}
