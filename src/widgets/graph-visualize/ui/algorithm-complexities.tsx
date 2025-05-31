import { COMPLEXITIES } from "@/shared/constants/complexities";
import { Mode } from "../model/constants";
import {
  SpaceComplexityDescription,
  TimeComplexityDescription,
} from "./complexity-descriptions";
import { AlgorithmComplexities } from "@/features/algorithm-complexity";

interface AlgorithmComplexitiesProps {
  tabMode: Mode;
}

export const GraphAlgorithmComplexities = ({ tabMode }: AlgorithmComplexitiesProps) => {

  if (tabMode === "edit") return;
  return (
    <div className="m-auto mt-2">
      <AlgorithmComplexities
        spaceComplexity={COMPLEXITIES.O_V}
        timeComplexity={COMPLEXITIES.O_V_E}
        spaceComplexityDescription={<SpaceComplexityDescription />}
        timeComplexityDescription={<TimeComplexityDescription />}
      />
    </div>
  );
};
