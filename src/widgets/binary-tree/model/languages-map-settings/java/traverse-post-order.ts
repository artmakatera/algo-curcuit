import { LANGUAGES } from "@/shared/constants/languages";
import { STEPS } from "../../constants";


export const code = `public class BinaryTree {
  private Node root;

  public BinaryTree() {
    root = null;
  }

  public List<Integer> postOrder() {
      List<Integer> result = new ArrayList<>();
      if (root == null) return result;
      
      Stack<TreeNode> stack = new Stack<>();
      TreeNode lastVisited = null;
      TreeNode current = root;
      
      while (!stack.isEmpty() || current != null) {
          if (current != null) {
              stack.push(current);
              current = current.left;
          } else {
              TreeNode peekNode = stack.peek();
              if (peekNode.right != null && lastVisited != peekNode.right) {
                  current = peekNode.right;
              } else {
                  result.add(peekNode.val);
                  lastVisited = stack.pop();
              }
          }
      }
      
      return result;
  }
}`



export const highlightLines: { [key in STEPS]?: number[] } = {
  [STEPS.start]: [8, 32, 12, 13, 14],
  [STEPS.addToStack]: [8, 32, 16, 29, 17, 18, 19, 20],
  [STEPS.addRightToStack]: [8, 32, 16, 29, 22, 23, 24],
  [STEPS.popFromStack]: [8, 32, 16, 29, 24, 25, 26, 27],
  [STEPS.endTraverse]: [8, 32, 31],
  [STEPS.earlyEndTraverse]: [8, 32, 10],
};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
}

export default model;