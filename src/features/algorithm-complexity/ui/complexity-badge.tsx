import { Badge } from "@/components/ui/badge";
import { Clock, Cpu } from "lucide-react";

import {
  Complexity,
  COMPLEXITY_BADGE_BACKGROUNDS,
} from "@/shared/constants/complexities";
import { cn } from "@/shared/lib/utils";
import React from "react";

export interface ComplexityBadgeProps {
  complexity: Complexity;
  isSpaceComplexity?: boolean;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label?: string;
}

const getIcon = (
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined,
  isSpaceComplexity: boolean | undefined
) => {
  if (icon) {
    return icon;
  }
  return isSpaceComplexity ? Cpu : Clock;
};

export function ComplexityBadge({
  complexity,
  isSpaceComplexity,
  icon,
  label,
}: ComplexityBadgeProps) {
  const Icon = getIcon(icon, isSpaceComplexity);

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
      <Icon className="w-2 h-2 mr-1" strokeWidth={3} />
      {label && <span>{label}:</span>}
      <span>{complexity}</span>
    </Badge>
  );
}
