import { Complexity } from "@/shared/constants/complexities";
import { ComplexityBadge } from "./complexity-badge";


export function ComplexityCase({
  complexity,
  label,
}: {
  label: string;
  complexity: Complexity;
}) {
  return (
    <div className="flex justify-between">
      <strong>{label}</strong>
      <ComplexityBadge complexity={complexity} />
    </div>
  );
}