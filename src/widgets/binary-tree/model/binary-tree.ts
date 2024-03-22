
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

  // remove(value: number, current: TreeNode | null = this.root, parent: TreeNode | null = null) {
  //   //write your code here
  //   if (!current) {
  //     return false;
  //   }

  //   // search current
  //   while (current.value !== value) {

  //     if (value > current.value) {
  //       if (current.right === null) return false
  //       current = current.right;
  //       parent = current
  //     } else {
  //       if (current.left === null) return false
  //       current = current.left;
  //     }
  //     parent = current

  //   }


  //   if (current.left !== null && current.right !== null) {


  //     current.value = this.getMin(current.right);
  //     return this.remove(current.value, current.right, current)
  //   }

  //   // remove root node
  //   if (parent === null) {
  //     if (current.left === null && current.right === null) {
  //       this.root = null;
  //       return this;
  //     }

  //     if (current.left !== null) {
  //       current.value = current.left.value;
  //       current.left = current.left.left;
  //       current.right = current.left?.right;

  //     } else {
  //       current.value = current.right?.value;
  //       current.left = current.right?.left;
  //       current.right = current.right?.right;
  //     }

  //     return this;

  //   }

  //   if (current === parent.left) {
  //     parent.left = current.left ?? current.right;
  //   } else if (current === parent.right) {
  //     parent.right = current.left ?? current.right;
  //   }

  //   return this;
  // }

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

  getMin(node: TreeNode) {
    while (node.left !== null) {
      node = node.left;
    }
    return node.value;
  }

  getHeight(node: TreeNode | null = this.root): number {
    if (node === null) {
      return -1;
    }

    return Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  }

  // addTreeNode({ current, result, isLeft, x = 400, y = 50, parent, level, height }: { current: TreeNode | null, result: any[], level: number, height: number, isLeft?: boolean, x?: number, y?: number, parent?: any, }) {
  //   if (current) {
  //     const data = { value: current.value, isLeft: !!isLeft, x, y, parent, level }
  //     result.push(data);

  //     let additional = height - level
  //     this.addTreeNode({ current: current.left, result, x: x - 40 * additional, y: y + 60, isLeft: true, parent: data, level: level + 1, height });
  //     this.addTreeNode({ current: current.right, result, x: x + 40 * additional, y: y + 60, parent: data, level: level + 1, height });
  //   }

  //   return result

  // }

  // getTreeView(x: number = 800) {

  //   const result: any[] = [];
  //   console.log(this.getHeight())
  //   const height = this.getHeight();

  //   return this.addTreeNode({ current: this.root, result, x: x, level: 0, height });
  // }
  addTreeNode({ current, result, isLeft, x = 400, y = 50, parent, level, height }: { current: TreeNode | null, result: any[], level: number, height: number, isLeft?: boolean, x?: number, y?: number, parent?: any, }) {
    if (current) {

      let nextLevel = level - 1;

      console.log({ height, level, nextLevel })
      const step = 40
      const radius = 20
      const width = Math.pow(2, height) * (step + radius)
      console.log({ width, level })
      const data = { value: current.value, isLeft: !!isLeft, x, y, parent, level }
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
        parent: data,
        level: nextLevel,
        height,
        y: (y + 60),
        x: x + step * Math.pow(2, nextLevel)
      });
    }

    return result

  }

  getTreeView(x: number = 800) {

    const result: any[] = [];
    console.log(this.getHeight())
    const height = this.getHeight();

    const xs = 0 + 40 * Math.pow(2, height)

    return this.addTreeNode({ current: this.root, result, x: xs, level: height, height });
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

let bst = new BinarySearchTree();

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
bst.insert(0);
bst.insert(2);


bst.insert(25);
bst.insert(29);
bst.insert(60);

bst.insert(50);
bst.insert(61);
bst.insert(59);
bst.insert(51);
bst.insert(49);
bst.insert(28);
bst.insert(30);
bst.insert(21);
bst.insert(26);
bst.insert(8);
bst.insert(9);

// bst.insert(100);




export default bst;





