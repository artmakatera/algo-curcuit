import { STEPS } from "./constants";

class TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

}

class BinarySearchTree {
  root: TreeNode | null;
  count: number = 0;

  constructor() {
    this.root = null;
  }
  insert(value: number) {
    //return this once you are done 
    //write your code here

    if (this.root === null) {
      this.root = new TreeNode(value)
      return;
    }

    let node = this.root;

    while (node) {
      if (value < node.value) {
        if (node.left === null) {
          node.left = new TreeNode(value);
          return;
        }
        node = node.left
      } else {
        if (node.right === null) {
          node.right = new TreeNode(value);
          return;
        }
        node = node.right;
      }
    }

    this.count++;

  }

  find(value: number) {
    //write your code here

    let currentNode = this.root;

    while (currentNode) {
      if (currentNode.value === value) {
        return currentNode;
      }

      if (value > currentNode.value) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }

    }

    return false;


  }


  removeChild(parent: TreeNode, value: number) {
    if (parent.left?.value === value) {
      parent.left = null;
      return true;
    }
    if (parent.right?.value === value) {
      parent.right = null;
      return true;
    }

    return false;
  }






}


class BinaryTreeDraw extends BinarySearchTree {
  getHeight(node: TreeNode | null = this.root): number {
    if (node === null) {
      return -1;
    }

    return Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  }

  addTreeNode({ current, result, isLeft, x = 400, y = 50, parent, level, height }: { current: TreeNode | null, result: any[], level: number, height: number, isLeft?: boolean, x?: number, y?: number, parent?: any, }) {
    if (current) {

      let nextLevel = level - 1;

      const step = 40;
      const data = { value: current.value, isLeft: !!isLeft, x, y, parent, level }
      result.push(data);




      const additionalY = nextLevel > 0 ? 30 * level : 1


      this.addTreeNode({
        current: current.left,
        result, isLeft: true,
        parent: data,
        level: nextLevel,
        height,
        y: (y + 60) + additionalY,
        x: x - step * Math.pow(2, nextLevel)
      });
      this.addTreeNode({
        current: current.right,
        result,
        parent: data,
        level: nextLevel,
        height,
        y: (y + 60) + additionalY,
        x: x + step * Math.pow(2, nextLevel)
      });

    }

    return result

  }

  getTreeView() {

    const result: any[] = [];
    const height = this.getHeight();

    const x = 1226 / 2
    return this.addTreeNode({ current: this.root, result, x: x, level: height, height });
  }

  *insertDraw(value: number) {
    //return this once you are done 
    //write your code here

    if (this.root === null) {
      this.root = new TreeNode(value)
      return;
    }

    let node = this.root;
    yield {
      type: STEPS.start,
      node: node

    }

    while (node) {
      yield {
        type: STEPS.checkNode,
        node: node
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



//For you to test on your own

//                     20
//                    /   \
//                    6    35
//                   / \   /  \ 
//                   3  8  27  55
//                  / \    / \   \
//                  1  3   25 29  60

let bst = new BinaryTreeDraw();

bst.insert(20);
bst.insert(6);
bst.insert(35);
bst.insert(3);
bst.insert(8);
bst.insert(9);
bst.insert(7);
bst.insert(27);
bst.insert(55);
bst.insert(1);
bst.insert(4);



export default bst;





