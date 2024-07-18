import { LANGUAGES } from "@/shared/constants/languages";
import { STEPS } from "../../constants";


export const code = ` class BinaryTree {
  ...
    public Optional<Node> deleteNode(Node root, int value) {
      if (root == null) {
          return Optional.empty();
      }

      if (value < root.value) {
          root.left = deleteNode(root.left, value);
      } else if (value > root.value) {
          root.right = deleteNode(root.right, value);
      } else {
          if (root.left == null) {
              return root.right;
          } else if (root.right == null) {
              return root.left;
          }

          int minValue = root.right.value;
          while (root.left != null) {
            minValue = root.left.value;
            root = root.left;
          }

          root.value = minValue
          root.right = deleteNode(root.right, root.value);
      }

      return Optional.of(root);
    }
}
`;


export const highlightLines: { [key in STEPS]?: number[] } = {
  [STEPS.start]: [3, 30],
  [STEPS.notFound]: [3, 30, 4, 5, 6],
  [STEPS.checkLeftNode]: [3, 30, 8, 9, 10],
  [STEPS.checkNode]: [3, 30],
  [STEPS.checkRightNode]: [3, 30, 10, 11, 12],
  [STEPS.highlightToRemoveWithoutRightChild]: [3, 30, 15, 16, 17],
  [STEPS.highlightToRemoveWithoutLeftChild]: [3, 30, 13, 14, 15],
  [STEPS.highlightToRemove]: [3, 30, 19],
  [STEPS.firstCheckMinValue]: [3, 30, 19],
  [STEPS.checkMinValue]: [3, 30, 19, 20, 21, 22, 23],
  [STEPS.minValueFirstRightChild]: [3, 30, 19, 20, 21, 22, 23],
  [STEPS.foundMinValue]: [3, 30, 25, 26, 27, 28, 29],

  [STEPS.removeSingleChild]: [],
  [STEPS.removedNode]: [],


};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
}

export default model;