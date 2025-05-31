import { TypographyList, TypographyP } from "@/components/ui/typography";

export const DialogInfo = () => {
  return (
    <div className="space-y-6">
      <div>
        <TypographyP>
          The graph is a data structure that consists of nodes (or vertices) and
          edges connecting them. It can represent various relationships and
          structures, such as social networks, transportation systems, and more.
        </TypographyP>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Graph Representation</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">1. Adjacency List</h4>
            <TypographyP className="text-sm">
              Each node maintains a list of its neighbors. Memory efficient for sparse graphs.
              Example: Node A → [B, C], Node B → [A, D], etc.
            </TypographyP>
          </div>

          <div>
            <h4 className="font-medium mb-2">2. Adjacency Matrix</h4>
            <TypographyP className="text-sm">
              A 2D matrix where matrix[i][j] = 1 if there&apos;s an edge between nodes i and j.
              Fast edge lookup but uses O(V²) space regardless of edge count.
            </TypographyP>
          </div>

          <div>
            <h4 className="font-medium mb-2">3. Node Classes/Objects</h4>
            <TypographyP className="text-sm">
              Each node is an object containing data and references to connected nodes.
              Intuitive for object-oriented programming but can be memory intensive.
            </TypographyP>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Graph Traversal Algorithms</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Depth-First Search (DFS)</h4>
            <TypographyP className="text-sm mb-2">
              Explores as far as possible along each branch before backtracking.
              Uses a stack (often implemented recursively).
            </TypographyP>
            <TypographyList className="text-sm">
              <li>Time Complexity: O(V + E)</li>
              <li>Space Complexity: O(V) for recursion stack</li>
              <li>Use cases: Cycle detection, topological sorting, pathfinding</li>
              <li>Pattern: Go deep first, then backtrack</li>
            </TypographyList>
          </div>

          <div>
            <h4 className="font-medium mb-2">Breadth-First Search (BFS)</h4>
            <TypographyP className="text-sm mb-2">
              Explores all neighbors at the current depth before moving to nodes at the next depth.
              Uses a queue data structure.
            </TypographyP>
            <TypographyList className="text-sm">
              <li>Time Complexity: O(V + E)</li>
              <li>Space Complexity: O(V) for queue storage</li>
              <li>Use cases: Shortest path in unweighted graphs, level-order traversal</li>
              <li>Pattern: Explore level by level, guarantees shortest path</li>
            </TypographyList>
          </div>
        </div>
      </div>
    </div>
  );
};