import { AdjacencyMatrix } from "@/shared/types/data-structures";
import { StepSnapshotPayload } from "../types";
import { STEPS } from "../constants";


export function* dfs(matrix: AdjacencyMatrix,
  startIndex: number): Generator<StepSnapshotPayload,
    number[],
    unknown> {
  yield {
    type: STEPS.start,
    stack: [],
    queue: [],
    visited: [],
    result: [],
    checkingIndex: null
  };

  const stack: number[] = [];
  const result: number[] = [];
  const visited: boolean[] = Array(matrix.length).fill(false);

  stack.push(startIndex);
  visited[startIndex] = true;
  yield {
    type: STEPS.addStartNode,
    stack: [...stack],
    queue: [],
    visited: [...visited],
    result: [...result],
    checkingIndex: startIndex
  };


  while (stack.length > 0) {
    const currentNode = stack.pop()!;
    yield {
      type: STEPS.removeFromStack,
      stack: [...stack],
      queue: [],
      visited: [...visited],
      checkingIndex: currentNode,
      result: [...result],
    };
    result.push(currentNode);
    yield {
      type: STEPS.addToResult,
      stack: [...stack],
      queue: [],
      visited: [...visited],
      result: [...result],
      checkingIndex: currentNode,
    };

    for (let i = 0; i < matrix[currentNode].length; i++) {
      const isConnected = matrix[currentNode][i];
      if (!isConnected) continue;

      yield {
        type: STEPS.checkIfVisited,
        stack: [...stack],
        queue: [],
        visited: [...visited],
        result: [...result],
        checkingIndex: i
      };
      if (!visited[i]) {
        stack.push(i);
        visited[i] = true;
        yield {
          type: STEPS.addToStack,
          stack: [...stack],
          queue: [],
          visited: [...visited],
          result: [...result],
          checkingIndex: i
        };
      }

    }

  }

  yield {
    type: STEPS.end,
    stack: [...stack],
    queue: [],
    visited: [...visited],
    result: [...result]
  };
  return result;

}