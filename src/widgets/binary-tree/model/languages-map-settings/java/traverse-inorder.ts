import { LANGUAGES } from "@/shared/constants/languages";
import { STEPS } from "../../constants";


export const code = `public class BinaryTree {
  private Node root;

  public BinaryTree() {
    root = null;
  }

  public List<Integer> inOrder() {
    List<Integer> result = new ArrayList<>();
    Stack<Node> stack = new Stack<>();
    Node current = root;

    if (current == null) {
      return result;
    }

    while (current != null || !stack.isEmpty()) {
      while (current != null) {
        stack.push(current);
        current = current.left;
      }
      current = stack.pop();
      result.add(current.value);
      current = current.right;
    }

    return result;
  }
}`



export const highlightLines: { [key in STEPS]?: number[] } = {
  [STEPS.start]: [8, 28, 9, 10, 11],
  [STEPS.addToStack]: [8, 28, 17, 25, 18, 19, 20, 21],
  [STEPS.popFromStack]: [8, 28, 17, 25, 22, 23, 24],
  [STEPS.endTraverse]: [8, 28, 27],
  [STEPS.earlyEndTraverse]: [8, 28, 13, 14, 15],
};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
}

export default model;