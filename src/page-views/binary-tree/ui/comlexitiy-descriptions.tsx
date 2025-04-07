import { ComplexityCase } from "@/features/algorithm-complexity/ui/complexity-case";
import { COMPLEXITIES } from "@/shared/constants/complexities";

export function SpaceComplexityDescription() {
  return (
    <div className="text-pretty text-sm">
      The space complexity of a BST is O(n), where n is the number of nodes in
      the tree, as it needs to store each node.
    </div>
  );
}

export function TimeComplexityDescription() {
  return (
    <div className="text-pretty flex flex-col gap-2 text-sm">
      <p className="text-pretty">
        The performance of a BST depends on its height. A balanced BST has a
        height of O(log n), while an unbalanced BST can have a height of O(n).
      </p>
      <ComplexityCase label="Best Case:" complexity={COMPLEXITIES.O_LOG_N} />
      <ComplexityCase label="Average Case:" complexity={COMPLEXITIES.O_LOG_N} />
      <ComplexityCase label="Worst Case:" complexity={COMPLEXITIES.O_N} />
    </div>
  );
}
