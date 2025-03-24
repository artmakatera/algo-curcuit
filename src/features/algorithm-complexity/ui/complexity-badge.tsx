import { Badge } from "@/components/ui/badge";
import { Clock, Cpu } from "lucide-react";

import { Complexity, COMPLEXITY_BADGE_BACKGROUNDS } from "@/shared/constants/complexities";
import { cn } from "@/shared/lib/utils";


export interface ComplexityBadgeProps {
  complexity: Complexity,
  isSpaceComplexity?: boolean

}

export function ComplexityBadge({ complexity, isSpaceComplexity }: ComplexityBadgeProps) {
  return (
    <Badge
    variant="destructive"
    className={cn(
      "ml-1 cursor-pointer",
      COMPLEXITY_BADGE_BACKGROUNDS[complexity]
    )}
    title={
      isSpaceComplexity
        ? "Worst-case space complexity"
        : "Worst-case time complexity"
    }
  >
    {isSpaceComplexity ? (
      <Cpu className="w-2 h-2 mr-1" strokeWidth={3} />
    ) : (
      <Clock className="w-2 h-2 mr-1" strokeWidth={3} />
    )}
    <span>{complexity}</span>
  </Badge>
  );
} 