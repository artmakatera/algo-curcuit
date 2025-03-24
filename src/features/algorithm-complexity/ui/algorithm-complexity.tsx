import { Badge } from "@/components/ui/badge";
import { Complexity } from "@/shared/constants/complexities";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ComplexityBadge } from "./complexity-badge";

interface AlgorithmComplexityProps {
  complexity: Complexity;
  description?: React.ReactNode;
  isSpaceComplexity?: boolean;
}

export function AlgorithmComplexity({
  complexity,
  description,
  isSpaceComplexity,
}: AlgorithmComplexityProps) {
  const badgeComponent = (
    <ComplexityBadge
      complexity={complexity}
      isSpaceComplexity={isSpaceComplexity}
    />
  );

  if (!description) {
    return badgeComponent;
  }

  return (
    <HoverCard>
      <HoverCardTrigger>{badgeComponent}</HoverCardTrigger>
      <HoverCardContent>{description}</HoverCardContent>
    </HoverCard>
  );
}
