import { STEPS } from "../constants";
import { TreeViewItem } from "../types";
import { BinaryTree, TreeNode } from "./base-binary-tree";

export type TreeArrayItem = {
  node: TreeNode;
  parent: TreeNode | null;
  isLeft: boolean;
}




class BinaryTreeDraw extends BinaryTree {

  constructor() {
    super();
    this.insertDraw = this.insertDraw.bind(this);
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
    return this.getTreeArray(false).reduce((acc: { [key: string]: TreeArrayItem[] }, item) => {
      const parentId = item.parent?.id || "null";
      acc[parentId] = acc[parentId] || [null, null];
      acc[parentId][item.isLeft ? 0 : 1] = item
      return acc;
    }, {});
  }

  *insertDraw(value: number) {
    if (typeof value !== "number") {
      return
    }
    //return this once you are done 
    //write your code here

    if (this.root === null) {
      this.root = new TreeNode(value)
      return;
    }

    let node = this.root;
    yield {
      type: STEPS.start,
      node: node,

    }

    while (node) {
      yield {
        type: STEPS.checkNode,
        node: node,

      }
      if (value < node.value) {
        if (node.left === null) {
          node.left = new TreeNode(value);
          yield {
            type: STEPS.insertNode,
            node: node.left,

          }
          return;
        }
        node = node.left
      } else {
        if (node.right === null) {
          node.right = new TreeNode(value);
          yield {
            type: STEPS.insertNode,
            node: node.right,

          }
          return;
        }
        node = node.right;
      }
    }

    this.count++;

  }
}

export { BinaryTreeDraw }
