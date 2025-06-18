import { STEPS } from "../constants";
import { TreeNode } from "./base-binary-tree";
import { BinaryTreeEditView } from "./binary-tree-edit-view";



class BinaryTreeDraw extends BinaryTreeEditView {

  constructor() {
    super();
    this.bfs = this.bfs.bind(this);
    this.dfs = this.dfs.bind(this);
    this.inOrder = this.inOrder.bind(this);
    this.postOrder = this.postOrder.bind(this);
  }



  *bfs() {
    const node = this.root;
    const treeView = this.getNodeGroups();
    yield {
      type: STEPS.start,
      node: node,
      treeView: treeView,
      queue: [],
      result: [],
    }


    if (!node) {
      yield {
        type: STEPS.earlyEndTraverse,
        node: null,
        treeView: treeView,
        queue: [],
        result: []
      }

      return [];
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
      yield {
        type: STEPS.popFromQueue,
        treeView: treeView,
        queue: [...queue],
        result: [...result],
      }
      let currentNode = queue.shift()!;
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
          type: STEPS.addLeftToQueue,
          node: currentNode.left,
          treeView: treeView,
          queue: [...queue],
          result: [...result],
        }
      }

      if (currentNode.right) {
        queue.push(currentNode.right);
        yield {
          type: STEPS.addRightToQueue,
          node: currentNode.right,
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


  *dfs() {
    const node = this.root;
    const treeView = this.getNodeGroups();

    if (!node) {
      yield {
        type: STEPS.earlyEndTraverse,
        node: null,
        treeView: treeView,
        stack: [],
        result: []
      }

      return [];
    }

    yield {
      type: STEPS.start,
      node: null,
      treeView: treeView,
      stack: [],
      result: [],
    }




    const stack: TreeNode[] = [node];
    const result: TreeNode[] = [];

    yield {
      type: STEPS.addToStack,
      node: null,
      treeView: treeView,
      stack: [...stack],
      result: [...result],
    }

    while (stack.length > 0) {
      const currentNode = stack.pop()!;
      result.push(currentNode);


      yield {
        type: STEPS.popFromStack,
        node: null,
        treeView: treeView,
        stack: [...stack],
        result: [...result],
      }

      if (currentNode.right) {
        stack.push(currentNode.right);
        yield {
          type: STEPS.addRightToStack,
          node: null,
          treeView: treeView,
          stack: [...stack],
          result: [...result],
        }
      }

      if (currentNode.left) {
        stack.push(currentNode.left);
        yield {
          type: STEPS.addLeftToStack,
          node: null,
          treeView: treeView,
          stack: [...stack],
          result: [...result],
        }
      }
    }

    yield {
      type: STEPS.endTraverse,
      node: null,
      treeView: treeView,
      stack: [...stack],
      result: [...result],
    }

    return result;

  }

  *inOrder() {
    const node = this.root;
    const treeView = this.getNodeGroups();

    if (!node) {
      yield {
        type: STEPS.earlyEndTraverse,
        node: null,
        treeView: treeView,
        stack: [],
        result: []
      }

      return [];
    }

    let stack: TreeNode[] = [];

    let result: TreeNode[] = [];


    let currentNode: TreeNode | null = node;

    yield {
      type: STEPS.start,
      node: currentNode,
      treeView: treeView,
      stack: [...stack],
      result: [...result],
    }

    while (currentNode || stack.length > 0) {
      while (currentNode) {
        stack.push(currentNode);
        yield {
          type: STEPS.addToStack,
          node: currentNode,
          treeView: treeView,
          stack: [...stack],
          result: [...result],
        }
        currentNode = currentNode.left;
      }

      currentNode = stack.pop()!;
      result.push(currentNode);
      yield {
        type: STEPS.popFromStack,
        node: currentNode,
        treeView: treeView,
        stack: [...stack],
        result: [...result],
      }



      currentNode = currentNode.right;
    }

    yield {
      type: STEPS.endTraverse,
      node: currentNode,
      treeView: treeView,
      stack: [...stack],
      result: [...result],
    };

    return result;

  }

  *postOrder() {
    const node = this.root;
     if (!node) {
        yield {
          type: STEPS.earlyEndTraverse,
          node: null,
          treeView: this.getNodeGroups(),
          stack: [],
          result: []
        }
      return [];
    }

    let currentNode: TreeNode | null = node;
    let previousNode: TreeNode | null = null;
    const result: TreeNode[] = [];
    const stack: TreeNode[] = [];

    yield {
      type: STEPS.start,
      node: currentNode,
      treeView: this.getNodeGroups(),
      stack: [...stack],
      result: [...result],
    }

    while (currentNode || stack.length > 0) {
        if (currentNode) {
            stack.push(currentNode);
            currentNode = currentNode.left;
            yield {
                type: STEPS.addToStack,
                node: currentNode,
                treeView: this.getNodeGroups(),
                stack: [...stack],
                result: [...result],
            }
            continue;
        }

        const peekNode = stack[stack.length - 1]

        if (peekNode.right && peekNode.right !== previousNode) {
            currentNode = peekNode.right; 
            yield {
                type: STEPS.addRightToStack,
                node: currentNode,
                treeView: this.getNodeGroups(),
                stack: [...stack],
                result: [...result],
            }
        } else {
            result.push(stack.pop()!)
            previousNode = peekNode;
            yield {
                type: STEPS.popFromStack,
                node: previousNode,
                treeView: this.getNodeGroups(),
                stack: [...stack],
                result: [...result],
            }
        }
    }

    yield {
      type: STEPS.endTraverse,
      node: null,
      treeView: this.getNodeGroups(),
      stack: [...stack],
      result: [...result],
    };

    return result;

  }

}

export { BinaryTreeDraw }
