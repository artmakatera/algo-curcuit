import { AdjacencyMatrix } from "@/shared/types/data-structures";
import { StepSnapshotPayload } from "../types";
import { STEPS } from "../constants";


export function* dfs(matrix: AdjacencyMatrix, startIndex: number): Generator<StepSnapshotPayload, number[], unknown> {
  yield { type: STEPS.start, stack: [], queue: [], visited: [], result: [] };

  const stack: number[] = [];
  const result: number[] = [];
  const visited: boolean[] = Array(matrix.length).fill(false);

  stack.push(startIndex);
  visited[startIndex] = true;
  yield { type: STEPS.addStartNode, stack: [...stack], queue: [], visited: [...visited], result: [...result] };

  
  while (stack.length > 0) {
    const currentNode = stack.pop()!;
    yield { type: STEPS.removeFromStack, stack: [...stack], queue: [], visited: [...visited], result: [...result] };
    result.push(currentNode);
    yield { type: STEPS.addToResult, stack: [...stack], queue: [], visited: [...visited], result: [...result] };

    for (let i = 0; i < matrix[currentNode].length; i++) {
      const isConnected = matrix[currentNode][i];
      yield { type: STEPS.checkIfVisited, stack: [...stack], queue: [], visited: [...visited], result: [...result] };
      if (isConnected > 0 && !visited[i]) {
        stack.push(i);
        visited[i] = true;
        yield { type: STEPS.addToStack, stack: [...stack], queue: [], visited: [...visited], result: [...result] };
      }

    }

  }

  yield { type: STEPS.end, stack: [...stack], queue: [], visited: [...visited], result: [...result] };
  return result;

}