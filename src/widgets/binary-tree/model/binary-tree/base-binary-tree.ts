
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


  remove(value: number, root: TreeNode | null = this.root): TreeNode | null {
    if (root === null) {
      return root;
    }

    if (value < root.value) {
      root.left = this.remove(value, root.left);
      return root;
    }

    if (value > root.value) {
      root.right = this.remove(value, root.right);
      return root;
    }

    if (root.right === null) {
      return root.left;
    }

    if (root.left === null) {
      return root.right;
    }

    let currentNode: TreeNode | null = root.right;
    let minValue = currentNode.value;

    while (currentNode) {
      minValue = currentNode.value;
      currentNode = currentNode.left;
    }

    root.value = minValue;
    root.right = this.remove(minValue, root.right)

    return root;

  }

  removeIterative(value: number) {
    if (this.root === null) {
      return;
    }

    let currentNode: TreeNode | null = this.root;
    let parentNode: TreeNode | null = null;

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
          return;
        }

        parentNode.right = currentNode.right;
        return;
      }


      if (currentNode.right === null) {
        if (parentNode === null) {
          this.root = currentNode.left;
          return;
        }

        if (currentNode.value < parentNode.value) {
          parentNode.left = currentNode.left;
          return;
        }

        parentNode.right = currentNode.left;
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
        return;
      }

      minParent.right = minValue.right;
      return;
    }
  }

}


