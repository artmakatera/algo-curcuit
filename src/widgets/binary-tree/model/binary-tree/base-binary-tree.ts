export class TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  id: string;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
    // ts-ignore
    this.id = globalThis.crypto.randomUUID()
  }

}

export class BinaryTree {
  root: TreeNode | null;
  count: number = 0;

  constructor() {
    this.root = null;
  }
  insert(value: number) {

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