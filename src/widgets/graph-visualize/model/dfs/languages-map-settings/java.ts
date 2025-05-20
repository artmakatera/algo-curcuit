import { LANGUAGES, STEPS } from "../../constants";



const code = `import java.util.*;

class DepthFirstSearch {
    public List<Integer> dfs(List<List<Integer>> graph, int start) {
        Stack<Integer> stack = new Stack<>();
        Set<Integer> visited = new HashSet<>();
        List<Integer> result = new ArrayList<>();
        
        // Add the start node to the stack
        stack.push(start);
        visited.add(start);
        
        while (!stack.isEmpty()) {
            // Get the next vertex from the stack
            Integer vertex = stack.pop();
            result.add(vertex);
            
            // Process all neighbors
            for (Integer neighbor : graph.get(vertex)) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    stack.push(neighbor);
                }
            }
        }
        
        return result;
    }
}`




export const highlightLines: { [key in keyof typeof STEPS]?: number[] }  = {
  [STEPS.start]: [3, 29, 4, 28],
  [STEPS.addStartNode]: [3, 29, 4, 28, 5, 6, 7, 9, 10, 11],
  [STEPS.addToResult]: [3, 29, 4, 28, 13, 25, 14, 15, 16],
  [STEPS.checkIfVisited]: [3, 29, 4, 28, 13, 25, 19 ,20, 23, 24],
  [STEPS.addToStack]: [3, 29, 4, 28, 13, 25, 19 ,20, 23, 24, 21, 22],
  [STEPS.end]: [3, 29, 4, 28, 27],
};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.java,
}

export default model;