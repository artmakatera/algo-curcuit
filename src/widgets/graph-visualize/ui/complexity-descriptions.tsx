import { ComplexityCase } from "@/features/algorithm-complexity/ui/complexity-case";
import { COMPLEXITIES } from "@/shared/constants/complexities";

export function SpaceComplexityDescription() {
  return (
    <div className="text-pretty text-sm">
      In the worst case, the queue might store all vertices in a level.
    </div>
  );
}

export function TimeComplexityDescription() {
  return (
    <div className="text-pretty flex flex-col gap-2 text-sm">
      <p className="text-pretty">
        V is the number of vertices (nodes) and E is the number of edges in the graph.
      </p>
      <p>BFS and DFS visits every vertex and every edge at most once.</p>
    </div>
  );
}
