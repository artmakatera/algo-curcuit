import { tree } from "next/dist/build/templates/app-page";
import { STEPS } from "../constants";
import { TreeArrayGroups, TreeArrayItem } from "../types";
import { BinaryTree, TreeNode } from "./base-binary-tree";



class BinaryTreeDraw extends BinaryTree {

  constructor() {
    super();
    this.insertDraw = this.insertDraw.bind(this);
    this.findDraw = this.findDraw.bind(this);
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
      yield {
        type: STEPS.insertNode,
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
      yield {
        type: STEPS.checkNode,
        node: node,
        treeView: { ...this.getNodeGroups() },

      }
      if (value < node.value) {
        if (node.left === null) {
          node.left = new TreeNode(value);
          yield {
            type: STEPS.insertNode,
            node: node,
            insertedNode: node.left,
            treeView: { ...this.getNodeGroups() },

          }
          return;
        }
        node = node.left
      } else {
        if (node.right === null) {
          node.right = new TreeNode(value);
          yield {
            type: STEPS.insertNode,
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

    //write your code here

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
        yield {
          type: STEPS.checkNode,
          node: currentNode,
          treeView: treeView,

        }
        currentNode = currentNode.right;
      } else {
        yield {
          type: STEPS.checkNode,
          node: currentNode,
          treeView: treeView,

        }
        currentNode = currentNode.left;
      }

    }

    return false;


  }

}

export { BinaryTreeDraw }
