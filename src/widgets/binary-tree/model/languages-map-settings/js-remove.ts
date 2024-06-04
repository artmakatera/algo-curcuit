import { LANGUAGES } from "@/shared/constants/languages";
import { STEPS } from "../constants";


export const code = ` class BinaryTree {
  ....

   remove(value) {
    if (this.root === null) {
      return;
    }

    let currentNode = this.root;
    let parentNode = null;

    while (currentNode) {
      if (value < currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.left;
        continue;
      }

      if (value > currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.right;
        continue;
      }

      if (currentNode.left === null) {
        if (parentNode === null) {
          this.root = currentNode.right;
          return;
        }

        if (currentNode.value < parentNode.value) {
          parentNode.left = currentNode.right;
        } else {
          parentNode.right = currentNode.right;
        }
        return;
      }


      if (currentNode.right === null) {
        if (parentNode === null) {
          this.root = currentNode.left;
          return;
        }

        if (currentNode.value < parentNode.value) {
          parentNode.left = currentNode.left;
        } else {
          parentNode.right = currentNode.left;
        }
        return;
      }

      let minValue = currentNode.right;
      let minParent = currentNode;

      while (minValue.left) {
        minParent = minValue;
        minValue = minValue.left;
      }

      currentNode.value = minValue.value;
      if (minValue.value < minParent.value) {
        minParent.left = minValue.right;
      } else {
        minParent.right = minValue.right;
      }
      return;
    }
    return false;
  }
}
`;


export const highlightLines: { [key in STEPS]?: number[] } = {
  [STEPS.start]: [4, 71],
  [STEPS.checkLeftNode]: [4, 71, 9, 10, 11, 12, 69, 13, 14, 15, 16, 17],
  [STEPS.checkRightNode]: [4, 71, 9, 10, 11, 12, 69, 19, 20, 21, 22, 23,],
  // to 69
  [STEPS.highlightToRemove]: [4, 71, 9, 10, 11, 12, 69, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37
    , 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
    50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61,
    62, 63, 64, 65, 66, 67, 68, 69, 70],
  [STEPS.removedRootNodeWithSingleRightChild]: [4, 71, 9, 10, 11, 12, 69,
    25, 37,
    26, 27, 28, 29,
  ],
  [STEPS.removeWithSingleRightChildToLeftParent]: [4, 71, 9, 10, 11, 12, 69,
    25, 37,
    31, 32, 33,
  ],
  [STEPS.removeWithSingleRightChildToRightParent]: [4, 71, 9, 10, 11, 12, 69,
    25, 37,
    33, 34, 35
  ],
  [STEPS.removedSingleNodeWithSingleRightChild]: [4, 71, 9, 10, 11, 12, 69,
    25, 37,
    36
  ],

  [STEPS.removedRootNodeWithSingleLeftChild]: [4, 71, 9, 10, 11, 12, 69,
    40, 52,
    41, 42, 43, 44,
  ],
  [STEPS.removeWithSingleLeftChildToLeftParent]: [4, 71, 9, 10, 11, 12, 69,
    40, 52,
    46, 47, 48,
  ],
  [STEPS.removeWithSingleLeftChildToRightParent]: [4, 71, 9, 10, 11, 12, 69,
    40, 52,
    48, 49, 50
  ],
  [STEPS.removedSingleNodeWithSingleLeftChild]: [4, 71, 9, 10, 11, 12, 69,
    40, 52,
    51
  ],
  [STEPS.firstCheckMinValue]: [4, 71, 9, 10, 11, 12, 69,
    54, 55
  ],
  [STEPS.checkMinValue]: [4, 71, 9, 10, 11, 12, 69,
    57, 58, 59, 60
  ],
  [STEPS.minValueFirstRightChild]: [4, 71, 9, 10, 11, 12, 69,
    62, 63, 64, 65, 66, 67,
  ],
  [STEPS.foundMinValue]: [4, 71, 9, 10, 11, 12, 69,
    62, 63, 64, 65, 66, 67,
  ],
  [STEPS.removedNode]: [4, 71, 9, 10, 11, 12, 69,
    68
  ],






  [STEPS.notFound]: [4, 70, 71],
};


const model = {
  code,
  highlightLines,
  language: LANGUAGES.javascript,
}

export default model;