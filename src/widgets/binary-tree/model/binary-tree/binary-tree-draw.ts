import { tree } from "next/dist/build/templates/app-page";
import { STEPS } from "../constants";
import { TreeArrayGroups, TreeArrayItem } from "../types";
import { BinaryTree, TreeNode } from "./base-binary-tree";



class BinaryTreeDraw extends BinaryTree {
  private existedValues: number[] = [];

  constructor() {
    super();
    this.insertDraw = this.insertDraw.bind(this);
    this.findDraw = this.findDraw.bind(this);
    this.removeDraw = this.removeDraw.bind(this);
    this.bfs = this.bfs.bind(this);
  }

  getHeight(node: TreeNode | null = this.root): number {
    if (node === null) {
      return -1;
    }

    return Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  }


  getTreeArray(isLeft: boolean = false, node: TreeNode | null = this.root, parent: TreeNode | null = null, result: TreeArrayItem[] = []) {

    if (node === null) {
      return result;
    }

    result.push({
      isLeft: isLeft,
      node: node,
      parent: parent ? parent : null,
    });

    this.getTreeArray(true, node.left, node, result);
    this.getTreeArray(false, node.right, node, result);

    return result;
  }

  getNodeGroups() {
    return this.getTreeArray(false).reduce((acc: TreeArrayGroups, item) => {
      const parentId = item.parent?.id || "null";
      acc[parentId] = acc[parentId] || [null, null];
      acc[parentId][item.isLeft ? 0 : 1] = structuredClone(item)
      return acc;
    }, {});
  }

  private addExistedValue(value: number) {
    if (this.existedValues.includes(value)) {
      throw new Error("Value already exists");
    }

    this.existedValues.push(value)
  }

  private removeExistedValue(value: number) {
    this.existedValues = this.existedValues.filter((v) => v !== value);
  }

  isValueExisted = (value: number) => {
    return this.existedValues.includes(value);
  }

  insert(value: number): void {
    this.addExistedValue(value);
    super.insert(value);
  }

  *insertDraw(value: number) {
    this.addExistedValue(value);

    if (typeof value !== "number") {
      return
    }
    //return this once you are done 
    //write your code here

    if (this.root === null) {
      this.root = new TreeNode(value)
      yield {
        type: STEPS.insertRootNode,
        node: this.root,
        insertedNode: this.root,
        treeView: { ...this.getNodeGroups() },

      }
      return;
    }

    let node = this.root;
    yield {
      type: STEPS.start,
      node: node,
      treeView: { ...this.getNodeGroups() },

    }

    while (node) {
      if (value < node.value) {
        yield {
          type: STEPS.checkLeftNode,
          node: node,
          treeView: { ...this.getNodeGroups() },

        }
        if (node.left === null) {
          node.left = new TreeNode(value);
          yield {
            type: STEPS.insertLeftNode,
            node: node,
            insertedNode: node.left,
            treeView: { ...this.getNodeGroups() },

          }
          return;
        }
        node = node.left
      } else {
        yield {
          type: STEPS.checkRightNode,
          node: node,
          treeView: { ...this.getNodeGroups() },

        }
        if (node.right === null) {
          node.right = new TreeNode(value);
          yield {
            type: STEPS.insertRightNode,
            node: node,
            insertedNode: node.right,
            treeView: { ...this.getNodeGroups() },

          }
          return;
        }
        node = node.right;
      }
    }

    this.count++;

  }

  *findDraw(value: number) {
    if (typeof value !== "number") {
      return
    }

    const treeView = this.getNodeGroups();

    let currentNode = this.root;
    yield {
      type: STEPS.start,
      node: currentNode,
      treeView: treeView,

    }

    while (currentNode) {
      if (currentNode.value === value) {
        yield {
          type: STEPS.foundNode,
          node: currentNode,
          treeView: treeView,

        }
        return currentNode;
      }

      if (value > currentNode.value) {
        currentNode = currentNode.right;
        yield {
          type: STEPS.checkRightNode,
          node: currentNode,
          treeView: treeView,

        }
      } else {
        currentNode = currentNode.left;
        yield {
          type: STEPS.checkLeftNode,
          node: currentNode,
          treeView: treeView,

        }
      }

    }

    yield {
      type: STEPS.notFound,
      node: null,
      treeView: treeView,

    }

    return false;


  }

  *removeDraw(value: number, root: TreeNode | null = this.root) {
    this.removeExistedValue(value);
    yield {
      type: STEPS.start,
      node: root,
      treeView: { ...this.getNodeGroups() },
    }

    if (this.root === null) {
      yield {
        type: STEPS.notFound,
        node: null,
        treeView: { ...this.getNodeGroups() },

      }
      return;
    }

    let currentNode: TreeNode | null = this.root;
    let parentNode: TreeNode | null = null;

    while (currentNode) {


      if (value < currentNode.value) {

        yield {
          type: STEPS.checkLeftNode,
          node: currentNode,
          treeView: { ...this.getNodeGroups() },

        }
        parentNode = currentNode;
        currentNode = currentNode.left;
        continue;
      }

      if (value > currentNode.value) {

        yield {
          type: STEPS.checkRightNode,
          node: currentNode,
          treeView: { ...this.getNodeGroups() },

        }
        parentNode = currentNode;
        currentNode = currentNode.right;
        continue;
      }

      yield {
        type: STEPS.checkNode,
        node: currentNode,
        treeView: { ...this.getNodeGroups() },

      }


      if (currentNode.left === null) {
        yield {
          type: STEPS.highlightToRemoveWithoutLeftChild,
          node: currentNode,
          nodeToRemove: currentNode,
          treeView: { ...this.getNodeGroups() },

        }

        if (parentNode === null) {
          this.root = currentNode.right;
          yield {
            type: STEPS.removedNode,
            node: null,

            treeView: { ...this.getNodeGroups() },

          }
          return;
        }

        yield {
          type: STEPS.removeSingleChild,
          nodeToRemove: currentNode,
          treeView: { ...this.getNodeGroups() },
        }

        if (currentNode.value < parentNode.value) {
          parentNode.left = currentNode.right;
        } else {
          parentNode.right = currentNode.right;
        }

        yield {
          type: STEPS.removedNode,
          node: null,
          treeView: { ...this.getNodeGroups() },

        }


        return;
      }


      if (currentNode.right === null) {
        yield {
          type: STEPS.highlightToRemoveWithoutRightChild,
          node: currentNode,
          nodeToRemove: currentNode,
          treeView: { ...this.getNodeGroups() },

        }
        if (parentNode === null) {
          this.root = currentNode.left;
          yield {
            type: STEPS.removedNode,
            node: null,
            treeView: { ...this.getNodeGroups() },

          }
          return;
        }


        yield {
          type: STEPS.removeSingleChild,
          nodeToRemove: currentNode,
          treeView: { ...this.getNodeGroups() },

        }

        if (currentNode.value < parentNode.value) {

          parentNode.left = currentNode.left;
        } else {
          parentNode.right = currentNode.left;

        }

        yield {
          type: STEPS.removedNode,
          node: null,
          treeView: { ...this.getNodeGroups() },

        }

        return;
      }

      yield {
        type: STEPS.highlightToRemove,
        node: currentNode,
        nodeToRemove: currentNode,
        treeView: { ...this.getNodeGroups() },

      }

      let minValue = currentNode.right;
      let minParent = currentNode;
      yield {
        type: STEPS.firstCheckMinValue,
        node: minValue,
        nodeToRemove: currentNode,
        treeView: { ...this.getNodeGroups() },
      }

      while (minValue.left) {
        minParent = minValue;
        minValue = minValue.left;
        yield {
          type: STEPS.checkMinValue,
          node: minValue,
          nodeToRemove: currentNode,
          treeView: { ...this.getNodeGroups() },
        }

      }

      if (minValue === currentNode.right) {
        yield {
          type: STEPS.minValueFirstRightChild,
          nodeToRemove: currentNode,
          treeView: { ...this.getNodeGroups() },

        }
      } else {

        yield {
          type: STEPS.foundMinValue,
          minValueNode: minValue,
          node: minValue,
          nodeToRemove: currentNode,
          treeView: { ...this.getNodeGroups() },
        }
      }



      currentNode.value = minValue.value;
      if (minValue.value < minParent.value) {
        minParent.left = minValue.right;
      } else {
        minParent.right = minValue.right;
      }

      yield {
        type: STEPS.removedNode,
        node: null,
        treeView: { ...this.getNodeGroups() },

      }

      return;
    }

    yield {
      type: STEPS.notFound,
      node: null,
      treeView: { ...this.getNodeGroups() },

    }
  }


  *bfs() {
    const node = this.root;

    if (!node) {
      return [];
    }

    const treeView = this.getNodeGroups();

    yield {
      type: STEPS.start,
      node: node,
      treeView: treeView,
      queue: [],
      result: [],
    }

    let queue: TreeNode[] = [node];
    let result: TreeNode[] = [];

      yield {
        type: STEPS.addToQueue,
        node: node,
        treeView: treeView,
        queue: [...queue],
        result: [...result],
      }


    while (queue.length > 0) {
      let currentNode = queue.shift()!;
      yield {
        type: STEPS.popFromQueue,
        node: currentNode,
        treeView: treeView,
        queue: [...queue],
        result: [...result],
      }
      result.push(currentNode);
      yield {
        type: STEPS.addToResult,
        node: currentNode,
        treeView: treeView,
        queue: [...queue],
        result: [...result],
      }

      if (currentNode.left) {
        queue.push(currentNode.left);
        yield {
          type: STEPS.addToQueue,
          node: node,
          treeView: treeView,
          queue: [...queue],
          result: [...result],
        }
      }

      if (currentNode.right) {
        queue.push(currentNode.right);
        yield {
          type: STEPS.addToQueue,
          node: node,
          treeView: treeView,
          queue: [...queue],
          result: [...result],
        }
      }

    }

    yield {
      type: STEPS.endTraverse,
      node: null,
      treeView: treeView,
      queue: [...queue],
      result: [...result],
    }



    return result;
  }

}

export { BinaryTreeDraw }
