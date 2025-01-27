import { LANGUAGES } from "@/shared/constants/languages";
import { STEPS } from "../../constants";
export const code = `class BinaryTree {
  Node root;

  BinaryTree() {
    root = null;
  }

  public List<Integer> bfs() {
    List<Integer> result = new ArrayList<>();
    if (root == null) {
      return result;
    }

    Queue<Node> queue = new LinkedList<>();
    queue.add(root);

    while (!queue.isEmpty()) {
      Node currentNode = queue.poll();
      result.add(currentNode.value);

      if (currentNode.left != null) {
        queue.add(currentNode.left);
      }

      if (currentNode.right != null) {
        queue.add(currentNode.right);
      }
    }

    return result;
  }
}`;

export const highlightLines: { [key in STEPS]?: number[] } = {
  [STEPS.start]: [8, 31, 9],
  [STEPS.addToQueue]: [8, 31, 14, 15],
  [STEPS.addLeftToQueue]: [8, 31,17, 28, 21, 22, 23],
  [STEPS.addRightToQueue]: [8, 31,17, 28, 25, 26, 27],
  [STEPS.popFromQueue]: [8, 31,17, 28, 18],
  [STEPS.addToResult]:  [8, 31,17, 28, 19],
  [STEPS.endTraverse]: [8, 31, 30],
  [STEPS.earlyEndTraverse]: [8, 31, 10, 11, 12],
};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
}

export default model;