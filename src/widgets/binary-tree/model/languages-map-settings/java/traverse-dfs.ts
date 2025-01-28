import { LANGUAGES } from "@/shared/constants/languages";
import { STEPS } from "../../constants";


export const code = `public class BinaryTree {
  private Node root;

  public BinaryTree() {
    root = null;
  }

  public List<Integer> dfs() {
    if (root == null) {
      return new ArrayList<>();
    }

    Stack<Node> stack = new Stack<>();
    List<Integer> result = new ArrayList<>();
    stack.push(root);

    while (!stack.isEmpty()) {
      Node current = stack.pop();
      result.add(current.value);

      if (current.right != null) {
        stack.push(current.right);
      }

      if (current.left != null) {
        stack.push(current.left);
      }
    }

    return result
  }
}`



export const highlightLines: { [key in STEPS]?: number[] } = {
  [STEPS.start]: [8, 31, 7],
  [STEPS.addToStack]: [8, 31, 13, 14, 15],
  [STEPS.addLeftToStack]: [8, 31, 17, 28, 25, 26, 27],
  [STEPS.addRightToStack]: [8, 31, 17, 28, 21, 22, 23],
  [STEPS.popFromStack]: [8, 31, 17, 28, 18, 19],
  [STEPS.endTraverse]: [8, 31, 30],
  [STEPS.earlyEndTraverse]: [8, 31, 9, 10, 11],
};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
}

export default model;