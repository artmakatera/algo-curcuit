import { LANGUAGES } from "@/shared/constants/languages";
import { STEPS } from "../../constants";


export const code = ` class BinaryTree {
  Node root;

  BinaryTree() {
        root = null;
  }

  Node insert(Node node, int value) {
    if (node == null) {
        return new Node(value);
    }

    if (value < node.value) {
        node.left = insert(node.left, value);
    } else if (value > node.value) {
        node.right = insert(node.right, value);
    }
    return node;
  }
}
`;


export const highlightLines: { [key in STEPS]?: number[] } = {
  [STEPS.insertRootNode]: [7, 9, 10, 11, 19],
  [STEPS.insertLeftNode]: [7, 18, 19],
  [STEPS.insertRightNode]: [7, 18, 19],
  [STEPS.start]: [8, 19],
  [STEPS.checkLeftNode]: [7, 13, 14, 15, 19],
  [STEPS.checkRightNode]: [7, 15, 16, 17, 19],

  [STEPS.foundNode]: [8, 19],
};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
}

export default model;