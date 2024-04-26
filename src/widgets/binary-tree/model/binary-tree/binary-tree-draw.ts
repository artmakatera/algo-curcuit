import { STEPS } from "../constants";
import { TreeViewItem } from "../types";
import { BinaryTree, TreeNode } from "./base-binary-tree";





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

  addTreeNode({ current, result, isLeft, x = 400, y = 50, parent, level, height }: TreeViewItem) {
    if (current) {

      let nextLevel = level - 1;

      const step = 35;
      const data = { value: current.value, current, isLeft: !!isLeft, x, y, parent, level, id: current.id }
      result.push(data);






      this.addTreeNode({
        current: current.left,
        result, isLeft: true,
        parent: data,
        level: nextLevel,
        height,
        y: (y + 60),
        x: x - step * Math.pow(2, nextLevel)
      });
      this.addTreeNode({
        current: current.right,
        result,
        isLeft: false,
        parent: data,
        level: nextLevel,
        height,
        y: (y + 60),
        x: x + step * Math.pow(2, nextLevel)
      });

    }

    result.sort((a, b) => (a.current?.value || 0) - (b.current?.value || 0))

    return result

  }



  getTreeView() {

    const result: any[] = [];
    const height = 4;
    const width = Math.pow(2, height)

    console.log(width)

    const x = 1226 / 2
    return this.addTreeNode({ current: this.root, result, x: x, level: height, height });
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
      treeView: [...this.getTreeView()]

    }

    while (node) {
      yield {
        type: STEPS.checkNode,
        node: node,
        treeView: [...this.getTreeView()]
      }
      if (value < node.value) {
        if (node.left === null) {
          node.left = new TreeNode(value);
          yield {
            type: STEPS.insertNode,
            node: node.left,
            treeView: [...this.getTreeView()]
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
            treeView: [...this.getTreeView()]
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
