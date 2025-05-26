import { LANGUAGES, STEPS } from "../../constants";

const code = `function bfs(graph, start) {
  // Add the start node to the queue
  const queue = [start];
  const visited = new Set([start]);
  const result = [];

  while (queue.length) {
    // Get the next vertex from the queue (FIFO)
    const vertex = queue.shift();
    result.push(vertex);

    // Process all neighbors
    for (const neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return result;
}`;

export const highlightLines: { [key in keyof typeof STEPS]?: number[] } = {
  [STEPS.start]: [1, 22],
  [STEPS.addStartNode]: [1, 22, 2, 3, 4, 5],
  [STEPS.addToResult]: [1, 22, 7, 19, 8, 9, 10],
  [STEPS.checkIfVisited]: [1, 22, 7, 19, 12, 13, 18, 14, 17],
  [STEPS.addToQueue]: [1, 22, 7, 19, 13, 18, 14, 17, 15, 16],
  [STEPS.end]: [1, 22, 21]
};

const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
}

export default model;
