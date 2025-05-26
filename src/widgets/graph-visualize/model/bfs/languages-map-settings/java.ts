import { LANGUAGES, STEPS } from "../../constants";

const code = `import java.util.*;

class BreadthFirstSearch {
    public List<Integer> bfs(List<List<Integer>> graph, int start) {
        Queue<Integer> queue = new LinkedList<>();
        Set<Integer> visited = new HashSet<>();
        List<Integer> result = new ArrayList<>();
        
        // Add the start node to the queue
        queue.add(start);
        visited.add(start);
        
        while (!queue.isEmpty()) {
            // Get the next vertex from the queue (FIFO)
            Integer vertex = queue.poll();
            result.add(vertex);
            
            // Process all neighbors
            for (Integer neighbor : graph.get(vertex)) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.add(neighbor);
                }
            }
        }
        
        return result;
    }
}`;

export const highlightLines: { [key in keyof typeof STEPS]?: number[] } = {
  [STEPS.start]: [3, 29, 4, 28],
  [STEPS.addStartNode]: [3, 29, 4, 28, 5, 6, 7, 9, 10, 11],
  [STEPS.addToResult]: [3, 29, 4, 28, 13, 25, 14, 15, 16],
  [STEPS.checkIfVisited]: [3, 29, 4, 28, 13, 25, 19, 24, 20, 23],
  [STEPS.addToQueue]: [3, 29, 4, 28, 13, 25, 19, 24, 20, 23, 21, 22],
  [STEPS.end]: [3, 29, 4, 28, 27],
};

const model = {
  code,
  highlightLines,
  language: LANGUAGES.java,
};

export default model;
