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
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    badgeLabel?: string;
  
}

export function AlgorithmComplexity({
  complexity,
  description,
  isSpaceComplexity,
  badgeLabel,
  icon: Icon,
}: AlgorithmComplexityProps) {
  const badgeComponent = (
    <ComplexityBadge
      complexity={complexity}
      isSpaceComplexity={isSpaceComplexity}
      icon={Icon}
      label={badgeLabel}
    />
  );

  if (!description) {
    return badgeComponent;
  }

  return (
    <HoverCard openDelay={0} closeDelay={200}>
      <HoverCardTrigger tabIndex={0}>{badgeComponent}</HoverCardTrigger>
      <HoverCardContent>{description}</HoverCardContent>
    </HoverCard>
  );
}
