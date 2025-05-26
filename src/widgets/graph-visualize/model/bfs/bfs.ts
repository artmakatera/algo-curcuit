import { AdjacencyMatrix } from "@/shared/types/data-structures";
import { StepSnapshotPayload } from "../types";
import { STEPS } from "../constants";

/**
 * Performs a breadth-first search (BFS) traversal of a graph
 * @param matrix Adjacency matrix representation of the graph
 * @param startIndex Starting vertex index
 * @returns Generator yielding step snapshots and finally the result array
 */
export function* bfs(
  matrix: AdjacencyMatrix,
  startIndex: number
): Generator<StepSnapshotPayload, number[], unknown> {
  let fromIndexToCheck: number | null = null;

  // Initialize algorithm - snapshot for visualization
  yield {
    type: STEPS.start,
    stack: [],
    queue: [],
    visited: [],
    result: [],
    checkingIndex: startIndex,
    fromIndexToCheck
  };

  const queue: number[] = [];
  const result: number[] = [];
  const visited: boolean[] = Array(matrix.length).fill(false);

  // Add start node to queue and mark as visited
  queue.push(startIndex);
  visited[startIndex] = true;

  // Snapshot after adding start node
  yield {
    type: STEPS.addStartNode,
    stack: [],
    queue: [...queue],
    visited: [...visited],
    result: [...result],
    fromIndexToCheck,
    checkingIndex: startIndex
  };

  while (queue.length > 0) {
    // Get the next vertex from the queue (FIFO)
    const currentNode = queue.shift()!;

    fromIndexToCheck = currentNode;
    result.push(currentNode);

    // Snapshot after adding node to result
    yield {
      type: STEPS.addToResult,
      stack: [],
      queue: [...queue],
      visited: [...visited],
      result: [...result],
      fromIndexToCheck,
      checkingIndex: null,
    };

    // Process all neighbors of the current node
    for (let i = 0; i < matrix[currentNode].length; i++) {
      const isConnected = matrix[currentNode][i];
      if (!isConnected) continue;

      // Snapshot for checking if neighbor is visited
      yield {
        type: STEPS.checkIfVisited,
        stack: [],
        queue: [...queue],
        visited: [...visited],
        result: [...result],
        fromIndexToCheck,
        checkingIndex: i
      };

      // If neighbor not visited, mark as visited and add to queue
      if (!visited[i]) {
        queue.push(i);
        visited[i] = true;

        // Snapshot after adding neighbor to queue
        yield {
          type: STEPS.addToQueue,
          stack: [],
          queue: [...queue],
          visited: [...visited],
          result: [...result],
          checkingIndex: i,
          fromIndexToCheck
        };
      }
    }
  }

  // Final snapshot
  yield {
    type: STEPS.end,
    stack: [],
    queue: [...queue],
    visited: [...visited],
    result: [...result]
  };

  return result;
}
